'use client';

import AdBanner from '@/components/AdBanner';
import React, { useState } from 'react';
import Questions from './ui/questions';
import GetRewardModal from './ui/GetRewardModal';

export default function Home() {


	const [currentQuestion, setCurrentQuestion] = useState({
        question: "White house is located in?",
        options: ["UK", "USA", "Russia", "India"],
		answer: 0
    });
	const [userAnswers , setUserAnswers ] = useState<number[]>([]);
	const [selectedAnswer , setSelectedAnswer ] = useState<number | null>(null);
	const [correctAnswer , setCorrectAnswer ] = useState<number | null>(null);
	const [showRewardPopup , setShowRewardPopup ] = useState(false);

    const questions = [
        {
            question: "White house is located in?",
            options: ["UK", "USA", "Russia", "India"],
			answer: 0
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Jupiter", "Saturn"],
			answer: 2
        },
    ];

    const handleAnswerClick = (index: number) => {
        const currentIndex = questions.findIndex(q => q.question === currentQuestion.question);
		setUserAnswers(prevAnswers => {
			const newAnswers = [...prevAnswers];
			newAnswers[currentIndex] = index;
			setSelectedAnswer(index);
			setCorrectAnswer(questions[currentIndex].answer);			
			return newAnswers;
		});
		setTimeout(() => {
			setSelectedAnswer(null);
			setCorrectAnswer(null);
			if(currentIndex === questions.length - 1) {
				setShowRewardPopup(true);
				return;
			}
			const nextIndex = (currentIndex + 1) % questions.length;
			setCurrentQuestion(questions[nextIndex]);
		}, 2000);
    };

	return (
		<div className="px-5 pt-[4rem] pb-20 flex flex-col items-center w-full gap-6">
			{ showRewardPopup && <GetRewardModal /> }
			{ !showRewardPopup && 
				<>
				<div className="max-w-[480px] max-h-[320px] mobile-width">
					<AdBanner adFormat='auto' adSlot='3051008040' adFullWidthResponse={true} />
				</div>
				<div className="text-center font-bold text-18">
					<div className="flex gap-1 text-[12px] text-[#8789c3]">
						Answer few questions and win
						<img className="w-3 object-contain" src="./coin.svg" alt="coins" />
						150 free!
					</div>
				</div>
				<div className="cursor-pointer">
					<img className="w-[55px]" src="./bell.gif" />
				</div>
				
				<Questions currentQuestion={currentQuestion} handleAnswerClick={handleAnswerClick} selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} />
				<div className="text-[#ffcc5b] font-bold cursor-pointer flex"><p>Sign-Up </p><p className="pl-[6px]">or Login</p></div>
				<div className="w-full pl-5">
					<div className="w-full font-bold text-lg">Play Quiz and Win Coins!</div>
					<ul className="text-[#8789c3] text-[14px] list-disc my-3 px-4">
						<li className="mb-2"> Play Quizzes in 25+ categories like GK, Sports, Bollywood, Business, Cricket &amp; more! </li>
						<li className="mb-2"> Compete with lakhs of other players! </li>
						<li className="mb-2"> Win coins for every game </li>
						<li className="mb-2"> Trusted by millions of other quiz enthusiasts like YOU! </li>
					</ul>
				</div>
				<div className="border-2 w-[100%] p-6 rounded-xl bg-white/10">
					<h1 className="text-2xl text-center text-blue-500">Fun Facts</h1>
					<p>The insurance industry is one of the largest industries in the United States, with over $1.5 trillion in annual premiums.The word "insurance" comes from the French word "assurer", which means "to make sure". The first insurance company in the United States was founded in Charleston, South Carolina, in 1735.The insurance industry employs over 2 million people in the United States. The average American household spends about $1,500 per year on insurance premiums. The most expensive type of insurance in the United States is long-term care insurance, which can cost upwards of $5,000 per month.</p>
				</div>
				<div className="flex w-full border justify-center gap-4 text-left items-center p-4 rounded-lg ">
					<div className="flex-1">Turn traffic into profit! Reach out for premium ads today!</div>
					<button className="w-[40%] md:w-[40%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%] big:w-[30%] bg-blue-500 hover:bg-blue-700 text-white font-medium text-md py-2 px-4 rounded-full">Contact Us</button>
				</div>
				</>
			}
		</div>
	);
}
