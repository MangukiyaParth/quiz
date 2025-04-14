"use client";
import AdBanner from '@/components/AdBanner';
import BottomNavigation from '@/components/BottomNavigation';
import { category } from '@/lib/category';
import { quiz } from '@/lib/quiz';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();

	const [currentCategory, setCurrentCategory] = useState(0);
	const sliderRef = useRef<HTMLDivElement>(null);
	const quizData = quiz.sort(function(){return 0.5 - Math.random()});

	// Categories data
	const categories = category;

	const scrollSlider = (direction: 'left' | 'right') => {
		if (sliderRef.current) {
			const scrollAmount = 200; // Adjust this value as needed
			sliderRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth'
			});
		}
	};

	const handleCategoryClick = (categoryId: number) => {
		setCurrentCategory(categoryId);
	};
	const filteredQuizData = currentCategory === 0 ? quizData : quizData.filter(q => q.cat_id === currentCategory);
	
	return (
		<div className="px-5 pt-[4rem] pb-20 flex flex-col items-center w-full gap-6">
			<div className="max-w-[480px] max-h-[320px] mobile-width">
				<AdBanner adFormat='auto' adSlot='3051008040' adFullWidthResponse={true} />
			</div>
			<div className="w-full">
				<div className="flex justify-between relative">
					<svg onClick={() => scrollSlider('left')} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="cursor-pointer bg-bg hover:opacity-100 absolute left-[-20px] top-[-6px] h-[50px] w-[20px]" height="80" width="80" xmlns="http://www.w3.org/2000/svg" style={{ boxShadow: "rgb(17, 24, 39) 5px 0px 10px 2px"}}><path fill="none" d="M0 0h24v24H0z"></path><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
					<svg onClick={() => scrollSlider('right')} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="cursor-pointer bg-bg hover:opacity-100 absolute right-[-20px] w-contain top-[-6px] h-[50px] w-[20px]" height="40" width="40" xmlns="http://www.w3.org/2000/svg" style={{ boxShadow: "rgb(17, 24, 39) -5px 0px 10px 2px"}}><path fill="none" d="M0 0h24v24H0z"></path><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
				</div>
				<div ref={sliderRef} id="slider" className="flex justify-between text-xs pb-1 w-full overflow-x-scroll scrollhide scroll-smooth whitespace-nowrap border-b border-white border-solid">
					<div className="cursor-pointer transition-all flex justify-center">
						<div onClick={() => handleCategoryClick(0)} className={`flex hover:bg-secondary justify-center border-2 border-border rounded-full mx-2 px-2 ${currentCategory == 0 ? 'bg-blue-950' : ''}`}>
							<div className="flex-none px-2 mx-4 py-2">All</div>
						</div>
					</div>
					{categories.map((category) => (
						<div key={category.id} className="cursor-pointer transition-all flex justify-center">
							<div onClick={() => handleCategoryClick(category.id)} className={`flex hover:bg-secondary justify-center border-2 border-border rounded-full mx-2 px-2 ${currentCategory == category.id ? 'bg-blue-950' : ''}`}>
								<div className="flex-none px-2 mx-4 py-2">{category.name}</div>
							</div>
						</div>
					))}
				</div>
			</div>
			{filteredQuizData.map((quiz) => {
				const cat_data = categories.find((cat) => cat.id === quiz.cat_id) || categories[0];
				return (
					<div className="w-full" key={quiz.id} onClick={() => router.push('quiz/'+encodeURI(quiz.name.replaceAll(" ","_")))} >
						<div className="flex flex-col gap-2 w-full bg-primary border border-border rounded-full py-2 cursor-pointer">
							<div className="flex gap-2 items-center px-2 justify-between">
								<div className="flex flex-col"><img className="object-cover w-24 rounded-full" src={cat_data.img} alt="CategoryImage" /></div>
								<div className="flex flex-col w-full justify-start">
									<div className="flex text-[8px] text-text_hd font-black sm:text-[10px] flex-col items-end">
										<div className="text-[#64d2ff] max-h-[20px] py-[2px]">
											<div className="flex sm:justify-center">{cat_data.name} &nbsp;| &nbsp;{quiz.name}</div>
										</div>
									</div>
									<div className="flex items-end flex-col mt-[5px]">
										<div className="text-[10px] sm:text-[14px] font-black flex">Play &amp; Win&nbsp;&nbsp;<img className="w-[20px] object-contain" src="/coin.svg" alt="Coins" />&nbsp;10000</div>
									</div>
									<div className="flex items-end flex-col mt-[5px]">
										<span className="text-[8px] flex gap-1 sm:text-[10px] bg-[#30d158]/20 text-[#30d158] px-2 rounded-full">Entry Fee &nbsp;<img className="w-[14px] object-contain" src="https://playerstorage.b-cdn.net/quiztwiz/assets/coin.svg" alt="Fee" />&nbsp;100</span>
									</div>
								</div>
								<div className="flex flex-col"><img src="/play.svg" alt="Play" className="rounded-full object-cover w-24" /></div>
							</div>
						</div>
					</div>
				)}
			)}
			<BottomNavigation activePage='home' />
		</div>
	);
}
