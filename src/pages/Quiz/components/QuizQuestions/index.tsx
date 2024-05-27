import React from 'react';

interface Props {
	answer: string;
	onClick: () => void;
}

export const QuizQuestions: React.FC<Props> = ({ answer, onClick }) => {
	return (
		<div className="text-black m-5">
			<button
				className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 border-2 border-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
				onClick={onClick}
			>
				{answer}
			</button>
		</div>
	);
};
