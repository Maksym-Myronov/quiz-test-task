import React from 'react';
import { useAppDispatch } from '../../../../hooks/useStore';
import { addQuizToArray } from '../../../../store/quizSlice';

interface Props {
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

export const StartPageQuiz: React.FC<Props> = ({ name, id, questions }) => {
	const dispatch = useAppDispatch();

	const handleAddQuizToArray = () => {
		dispatch(addQuizToArray({ id, name, questions }));
	};

	return (
		<button
			className=" bg-stone-100 rounded-md w-64 h-52 items-center justify-center flex cursor-pointer mt-5"
			onClick={handleAddQuizToArray}
		>
			<p>{name}</p>
		</button>
	);
};
