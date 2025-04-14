"use client";
import AdBanner from '@/components/AdBanner';

export default function Page() {
	const goTOHomePage = () => {
		window.location.href = '/home';
	};
	return (
		<div className="px-5 pt-[4rem] pb-20 flex flex-col items-center w-full gap-6">
			<div className="max-w-[480px] max-h-[320px] mobile-width">
				<AdBanner adFormat='auto' adSlot='3051008040' adFullWidthResponse={true} />
			</div>
			<div className="flex flex-col gap-2 md:gap-6 bg-bg border-2 border-border rounded-[30px] px-[10px] py-5 mx-[10px]">
				<div className="flex gap-2 items-center px-5 ">
					<div className="flex justify-center flex-col w-full items-center">
						<div className="text-[8px] text-[#64d2ff] font-black sm:text-[10px]"> BrainBlitz</div>
						<div className="flex gap-1 text-[14px] font-black sm:text-[18px]">
							You have won 150
							<img className="w-[20px] object-contain" src="/coin.svg" alt="Coin" /> 
						</div>
					</div>
				</div>
				<button className="self-center border-text bg-[#1F01FF] border-[1px] w-full md:w-auto text-text text-center rounded-full font-bold text-sm py-3 md:px-10 px-4 cursor-pointer" onClick={() => goTOHomePage()}>PLAY QUIZ</button>
				<ul className="list-disc flex flex-col gap-3 px-9 text-sm text-text">
					<li>You've got 90 - 150 seconds to answer all questions</li>
					<li>Answer as many questions as you can</li>
					<li>For Every Correct answer you will get +50 points and will loose -25 points on every Incorrect answer</li>
					<li>You can take help by using the lifelines present in the contest.</li>
					<li>Lifelines can be used for free or by using a given amount of coins for each lifeline.</li>
				</ul>
			</div>
		</div>
	);
}
