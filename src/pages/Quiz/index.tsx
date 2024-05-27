import React from 'react';
import { useAppSelector } from '../../hooks/useStore';
import { QuizData } from './components/QuizData';

export const Quiz: React.FC = () => {
	const quizData = useAppSelector((state) => state.quiz.quiz);
	console.log(quizData);

	return (
		<div className="max-w-7xl m-auto">
			{quizData.map((item) => (
				<QuizData key={item.id} questions={item.questions} />
			))}
		</div>
	);
};
