import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import QuizFetcher from "../components/QuizFetcher";
import './PlayQuiz.css';

const PlayQuiz = () => {
    const [loading, setLoading] = useState(true);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [quizData, setQuizData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});

    const loadQuizData = async (quizId) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'create'));
            const quizData = querySnapshot.docs
                .filter(doc => doc.id === quizId)
                .map(doc => ({ id: doc.id, ...doc.data() }))[0];
            setQuizData(quizData);
            console.log("Load data for quiz with ID:", quizId);
        } catch (error) {
            console.error('Error fetching collection data:', error);
        }
    };

    useEffect(() => {
        if (selectedQuiz) {
            setSelectedOptions({});
            loadQuizData(selectedQuiz);
        }
    }, [selectedQuiz]);

    const handleOptionClick = (qIndex, option, correctAnswer) => {
        setSelectedOptions(prev => ({
            ...prev,
            [qIndex]: {
                selected: option,
                isCorrect: option === correctAnswer
            }
        }));
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
                {quizData && (
                    <div>
                        <h2>{quizData.title}</h2>
                        {quizData.questions.map((question, qIndex) => (
                            <div key={qIndex} className="quiz-item">
                                <hr />
                                <p>Question {qIndex + 1}:</p>
                                <h2>{question.question}</h2>
                                <p>Select the right answer:</p>
                                <div className="quiz-options-grid">
                                    {question.options.map((option, index) => (
                                        <h3
                                            key={index}
                                            className={`quiz-option ${selectedOptions[qIndex]?.selected === option ? (selectedOptions[qIndex]?.isCorrect ? 'correct' : 'wrong') : ''}`}
                                            onClick={() => handleOptionClick(qIndex, option, question.answer)}
                                        >
                                            {option}
                                        </h3>
                                    ))}
                                </div>
                                {selectedOptions[qIndex]?.selected && (
                                    selectedOptions[qIndex]?.isCorrect ? (
                                        <h2 className="quiz-answer">Correct! <b style={{ color: "green" }}>{question.answer}</b> is the right answer.</h2>
                                    ) : (
                                        <h2 className="wrong-answer">Wrong! Try Again</h2>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayQuiz;
