import React, { useState } from 'react';

const QuizBuild = ({ setPassedQuiz }) => {
    const questions = [
        {
            questionText: 'What is the capital of France?',
            answerOptions: [
                { answerText: 'New York', isCorrect: false },
                { answerText: 'London', isCorrect: false },
                { answerText: 'Paris', isCorrect: true },
                { answerText: 'Dublin', isCorrect: false },
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
                { answerText: 'Elon Musk', isCorrect: true },
                { answerText: 'Jeff Bezos', isCorrect: false },
                { answerText: 'Bill Gates', isCorrect: false },
                { answerText: 'Tony Stark', isCorrect: false },
            ],
        },
        {
            questionText: 'Quien es el mejor artista?',
            answerOptions: [
                { answerText: 'Guns and roses', isCorrect: false },
                { answerText: 'U2', isCorrect: false },
                { answerText: 'Pink Floyd', isCorrect: false },
                { answerText: 'Peso Pluma', isCorrect: true },
            ],
        },
    ];

    const [userAnswers, setUserAnswers] = useState(
        Array(questions.length).fill(null)
    );

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const allQuestionsAnswered = userAnswers.every(
            (answer) => answer !== null
        );
        const allAnswersCorrect = userAnswers.every((answer) => answer);

        if (allQuestionsAnswered && allAnswersCorrect) {
            setPassedQuiz(true);
            setErrorMessage('');
        } else {
            setErrorMessage(
                'You have one or more incorrect answers. Please try again.'
            );
        }
    };

    const handleAnswerOptionClick = (questionIndex, answerIndex) => {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[questionIndex] =
            questions[questionIndex].answerOptions[answerIndex].isCorrect;
        setUserAnswers(newUserAnswers);
    };

    return (
        <div className='quiz-container'>
            {questions.map((question, questionIndex) => (
                <div key={questionIndex} className='question-section'>
                    <div className='question-text'>{question.questionText}</div>
                    <div className='answer-section'>
                        {question.answerOptions.map(
                            (answerOption, answerIndex) => (
                                <label
                                    key={answerIndex}
                                    className='answer-option'
                                >
                                    <input
                                        type='radio'
                                        name={`question${questionIndex}`}
                                        className='answer-radio'
                                        onChange={() =>
                                            handleAnswerOptionClick(
                                                questionIndex,
                                                answerIndex
                                            )
                                        }
                                    />
                                    {answerOption.answerText}
                                </label>
                            )
                        )}
                    </div>
                </div>
            ))}
            {errorMessage && (
                <div className='error-message'>{errorMessage}</div>
            )}
            <div className='button-container-quiz'>
                <button onClick={handleSubmit} className='button-85'>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default QuizBuild;
