import React from 'react';

interface QuizResultsProps {
	correctAnswersCount: number;
	totalTime: number;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
	correctAnswersCount,
	totalTime
}) => {
	return (
		<div className="text-black mt-5 bg-white w-[44rem] p-5">
			<h2>Quiz Completed</h2>
			<p>Correct Answers: {correctAnswersCount}</p>
			<p>Total Time: {totalTime} seconds</p>
		</div>
	);
};
