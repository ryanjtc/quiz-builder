import React, { useState } from 'react';
import './CreateQuiz.css';
import {collection, addDoc, getDocs} from 'firebase/firestore';
import { db } from '../firebase';
import QuizFetcher from "../components/QuizFetcher";

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{
        question: '',
        options: ['', '', '', ''],
        answer: ''
    }]);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleFormSubmission = async (event) => {
        event.preventDefault();
        try {
            const formattedQuestions = questions.map(q => ({
                question: q.question,
                options: q.options,
                answer: q.answer || q.options[0]
            }));

            await addDoc(collection(db, 'create'), {
                title: title,
                questions: formattedQuestions
            });
            await fetchQuizzes();
        } catch (error) {
            console.error('Error saving quiz:', error);
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

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (qIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answer = value;
        setQuestions(newQuestions);
    };

    const addQuestionSet = () => {
        setQuestions([...questions, {
            question: '',
            options: ['', '', '', ''],
            answer: ''
        }]);
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
                <br/>
                <br/>
                <br/>
                {questions.map((q, qIndex) => (
                    <div key={qIndex}>
                        <label>Question {qIndex + 1}:</label>
                        <textarea
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        />
                        <label>Options:</label>
                        <div className='options-grid'>
                        {q.options.map((option, oIndex) => (
                            <input
                                key={oIndex}
                                type="text"
                                value={option}
                                placeholder={oIndex +1}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            />
                        ))}
                        </div>
                        <label>Answer:</label>
                        <select
                            value={q.answer}
                            onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                        >
                            {q.options.map((option, oIndex) => (
                                <option key={oIndex} value={option}>
                                    Option {oIndex + 1}
                                </option>
                            ))}
                        </select>
                        <hr/>
                        <br/>
                        <br/>
                    </div>
                ))}
                <button type="button" onClick={addQuestionSet}>Add Question</button>
                <br/>
                <br/>
                <button type="submit">Submit</button>
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
