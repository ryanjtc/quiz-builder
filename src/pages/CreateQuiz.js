import React, { useState } from 'react';
import './CreateQuiz.css';
import {collection, addDoc, getDocs} from 'firebase/firestore';
import { db } from '../firebase';
import QuizFetcher from "../components/QuizFetcher";

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setAnswer] = useState('');
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleFormSubmission = async (event) => {
        event.preventDefault();
        try {
            //check if the answer is empty, if so, set it to the value of the first option.
            const answerToSubmit = answer || options[0];

            await addDoc(collection(db, 'create'), {
                title: title,
                question: question,
                options: options,
                answer: answerToSubmit
            });
            await fetchQuizzes();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const fetchQuizzes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'create'));
            const fetchedQuizzes = [];
            querySnapshot.forEach((doc) => {
                fetchedQuizzes.push({ id: doc.id, ...doc.data() });
            });
            setQuizzes(fetchedQuizzes);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    return (
        <div className="create-quiz-container">
            <h1>Create a new quiz</h1>
            <form onSubmit={handleFormSubmission}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Question:</label>
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <label>Options:</label>
                {[1, 2, 3, 4].map((index) => (
                    <input
                        key={index}
                        type="text"
                        value={options[index - 1]}
                        onChange={(e) => handleOptionChange(index - 1, e.target.value)}
                    />
                ))}
                <label>Answer:</label>
                <select
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                >
                    {[1, 2, 3, 4].map((index) => (
                        <option key={index} value={options[index - 1]}>
                            Option {index}
                        </option>
                    ))}
                </select>
                <button type={'submit'}>Submit</button>
            </form>
            <QuizFetcher setQuizzes={setQuizzes} setLoading={setLoading} />
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : quizzes.length === 0 ? (
                    <p>There are no quizzes saved</p>
                ) : (
                    <>
                        <p>Quiz List:</p>
                        <ol>
                            {quizzes.map(quiz => (
                                <li key={quiz.id}>{quiz.title} - {quiz.id}</li>
                            ))}
                        </ol>
                    </>
                )}
            </div>
        </div>
    );
};

export default CreateQuiz;
