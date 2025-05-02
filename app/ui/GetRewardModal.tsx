import React from 'react';
import { useRouter } from 'next/navigation';
import { showRewardAd } from '@/lib/showReward';

export default function GetRewardModal() {
	const router = useRouter();
	const moveToNextPage = () => {
		router.push('/playquiz');
	};
	const claimCoin = async () => {
		showRewardAd(100, (result: any) => {
			moveToNextPage();
			// if (result) {
			// 	console.log('Reward granted!');
			// }
			// else {
			// 	console.log('Reward not granted!');
			// }
		});
	};
	return (
		<div className="fixed modal z-50 inset-0 flex items-center justify-center w-[100%]">
			<div className="fixed inset-0 bg-gray-800 opacity-90"></div>
			<div className="relative flex bg-[#111827] border-2 border-white text-white flex-col justify-center items-center mx-4 p-8 rounded-[1.5rem] lg:w-[40%] w-full">
				<button className="absolute top-0 right-0 m-4 text-white-500 hover:text-gray-700 focus:outline-none" onClick={moveToNextPage}>
					<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
				<img src="/getreward.gif" alt="reward logo" loading="lazy" />
				<h2 className="text-2xl mb-4 text-[#D8E91E]">New Reward Available</h2>
				<h2 className="text-[1.5rem] md:text-4xl mb-4">Get Instant 100 Coins!</h2>
				<p className="mb-6 text-[#8E8F98]">Watch a simple ad and get rewarded</p>
				<button className="bg-[#D8E91E] md:w-[100%] w-[50%] rounded-[1.5rem] text-black font-bold py-4 px-4 mr-2" onClick={claimCoin}>Claim</button>
			</div>
		</div>
	)
}