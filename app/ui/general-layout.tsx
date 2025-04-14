'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function GeneralLayout({ children, title }: { children: React.ReactNode, title: string }) {
	const router = useRouter();
	const pathname = usePathname();
	const [coins, setCoins] = useState(0);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedCoinData = sessionStorage.getItem('localCoins');
			const coinData = storedCoinData ? JSON.parse(storedCoinData) : null;
			setCoins(coinData ? coinData.coins : 0);

			const storedData = sessionStorage.getItem('_u');
			if(storedData == undefined && pathname != '/' && pathname != '/playquiz') {
				router.push('/');
			}
			else if (storedData == 'true' && pathname == '/') {
				router.push('/home');
			}
		}
	}, []);
	return (
		<div className="text-white h-screen flex overflow-hidden">
			<div className="min-w-full max-w-[520px] lgm:min-w-[360px] lgm:max-w-[360px] w-full md:w-auto md:min-w-[520px] max-h-screen flex flex-col gap-3 items-center overflow-y-auto scrollhide box-border bg-bg">
				
				<div className="bg-bg z-10 flex px-1 py-2 items-center justify-between fixed left-0 min-w-full max-w-[520px] lgm:min-w-[360px] w-full md:w-auto md:min-w-[520px] bg-[#0f172a] shadow-xl shadow-[rgb(17,24,39)_0px_15px_15px]">
					<div className="flex items-center gap-2">
						<span className="px-3 cursor-pointer"><img src="/brainbliz-text.svg" alt="QuizTwiz" className="h-[30px]" /></span>
					</div>
					{
						pathname != '/' &&
						<div className="flex items-center text-[12px]">
							<div className="flex text-center gap-1 items-center  rounded-full px-2  cursor-pointer">
								<div className="flex item-center mb-2"><img className="w-[25px] object-contain" src="/reward.gif" alt="animation" /></div>
								<div className="flex items-center text-white">Daily Reward</div>
							</div>
							<div className="flex gap-1 items-center bg-[#1a2f77] px-4 py-1  mx-5 rounded-full">
								<img className="w-[15px] object-contain" src="/coin.svg" alt="Coins" />
								<div className="flex items-center gap-1 text-xs"><div className="font-bold text-[12px] text-white"> {coins} </div><div className="text-[10px] text-text">COINS</div></div>
							</div>
						</div>
					}
				</div>
				{children}

			</div>
			<div className="w-full relative hidden md:flex max-h-screen flex-col justify-center items-center gap-6 text-white border-[#e0e0e0] bg-gradient-to-r from-bg to-teal-900  object-cover bg-no-repeat bg-center h-screen">
				<img src="/sidePoster.png" className="w-60 lg:w-[70%] big:w-[45%] big:fixed big:z-[-1] big:top-10" alt="ERROR" loading="lazy" />
				<div className="font-bold lgm:text-sm lg:text-sm big:text-2xl big:fixed big:bottom-12  big:z-[-1]"> 
					Welcome to Brainbliz. Play a quiz and earn coins. 
					<p className="font-normal text-2xl pt-4 text-center"> There's a quiz for everyone! </p> 
				</div>
			</div>
		</div>
	);
}