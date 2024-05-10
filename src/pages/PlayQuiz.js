import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import QuizFetcher from "../components/QuizFetcher";
import './PlayQuiz.css'; // Import the CSS file

const PlayQuiz = () => {
    const [loading, setLoading] = useState(true);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [quizData, setQuizData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const loadQuizData = async (quizId) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'create'));
            const quizData = querySnapshot.docs
                .filter(doc => doc.id === quizId)
                .map(doc => ({ id: doc.id, ...doc.data() }));
            setQuizData(quizData);
            console.log("Load data for quiz with ID:", quizId);
        } catch (error) {
            console.error('Error fetching collection data:', error);
        }
    };

    useEffect(() => {
        if (selectedQuiz) {
            setSelectedOption(null);
            loadQuizData(selectedQuiz);
        }
    }, [selectedQuiz]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="play-quiz-container">
            <h1>Select one to play!</h1>
            <h3>Quiz List:</h3>
            <QuizFetcher setQuizzes={setQuizzes} setLoading={setLoading} />
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : quizzes.length === 0 ? (
                    <p>There are no quizzes saved</p>
                ) : (
                    <ol className="quiz-list">
                        {quizzes.map(quiz => (
                            <li key={quiz.id}>
                                <p onClick={() => setSelectedQuiz(quiz.id)}>
                                    {quiz.title}
                                </p>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
            <div className="quiz-data-container">
                {quizData.length > 0 && (
                    <div>
                        <div key={quizData[0].id} className="quiz-item">
                            <div>
                                <h2>{quizData[0].title}</h2>
                                <hr/>
                                <p>Question:</p>
                                <h2>{quizData[0].question}</h2>
                                <p>Select the right answer:</p>
                                <div className="quiz-options-grid">
                                    {quizData[0].options.map((option, index) => (
                                        <h3 key={index} className={`quiz-option ${selectedOption === option && option === quizData[0].answer ? 'correct' : ''}`} onClick={() => handleOptionClick(option)}>
                                            {option}
                                        </h3>
                                    ))}
                                </div>
                                {selectedOption && selectedOption === quizData[0].answer ? (
                                    <h2 className="quiz-answer"> Correct! <b style={{color: "green"}}>{quizData[0].answer}</b>  is the right answer.</h2>
                                ) : selectedOption ? (
                                    <h2 className="wrong-answer">Wrong! Try Again</h2>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayQuiz;
