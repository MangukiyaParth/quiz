import React from 'react';

interface Question {
    question: string;
    options: string[];
}

export default function Questions({currentQuestion, handleAnswerClick, selectedAnswer, correctAnswer}: {currentQuestion: Question, handleAnswerClick: (index: number) => void, selectedAnswer: number | null, correctAnswer:  number | null}) {

    return (
        <>
            <div className="text-md font-bold px-10 text-center">
                <span>{currentQuestion.question}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 px-3 min-w-full mt-2">
                {currentQuestion.options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        className={`flex flex-col justify-center items-center text-[14px] py-2 min-h-[32px] ${
                            correctAnswer !== null && selectedAnswer !== null && index === correctAnswer
                                ? 'bg-green-500 border-green-700'
                                : correctAnswer !== null && selectedAnswer !== null && index === selectedAnswer
                                ? 'bg-red-500 border-red-700'
                                : ''
                        } border-2 rounded-full cursor-pointer`}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </>
    )
}