"use client";
import AdBanner from '@/components/AdBanner';
import BottomNavigation from '@/components/BottomNavigation';
import { category } from '@/lib/category';
import { quiz } from '@/lib/quiz';
import { useRef, useState } from 'react';
import QuizItem from '../ui/QuizItem';

export default function Page() {

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
					<QuizItem quizData={quiz} catData={cat_data} key={quiz.id} />
				)}
			)}
			<BottomNavigation activePage='home' />
		</div>
	);
}
