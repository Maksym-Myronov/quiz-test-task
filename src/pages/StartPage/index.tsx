import React, { useEffect, useState } from 'react';
import { StartPageQuiz } from './components/StartPageQuiz';
import { StartPageAdd } from './components/StartPageAdd';

interface Params {
	id: number;
	name: string;
	questions: {
		question: string;
		options: {
			answer: string;
			isCorrect: boolean;
		}[];
	}[];
}

export const StartPage: React.FC = () => {
	const [dataFromApi, setDataFromApi] = useState<Params[]>([]);

	useEffect(() => {
		fetch('../src/api/data.json')
			.then((response) => response.json())
			.then((data) => setDataFromApi(data))
			.catch((error) => console.error('Error fetching the quiz data:', error));
	}, []);

	return (
		<div className="max-w-7xl m-auto ">
			<StartPageAdd />
			<div className="flex gap-5">
				{dataFromApi.map((item) => (
					<StartPageQuiz
						key={item.id}
						name={item.name}
						id={item.id}
						questions={item.questions}
					/>
				))}
			</div>
		</div>
	);
};
