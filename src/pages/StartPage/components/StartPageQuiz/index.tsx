import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/useStore';
import { setQuizArray } from '../../../../store/quizSlice';

interface Props {
	id: number;
	name: string;
	questions: {
		id: number;
		question: string;
		options: {
			answer: string;
			isCorrect: boolean;
		}[];
	}[];
	handleDeleteQuiz: (id: number) => void;
	onEditQuiz: (id: number) => void;
	isDelete?: boolean;
	isChange?: boolean;
}

export const StartPageQuiz: React.FC<Props> = ({
	name,
	id,
	questions,
	isDelete,
	handleDeleteQuiz,
	onEditQuiz,
	isChange
}) => {
	const dispatch = useAppDispatch();

	const handleAddQuizToArray = () => {
		dispatch(setQuizArray({ id, name, questions }));
	};

	return (
		<div className="bg-stone-100 rounded-md w-64 h-52 mt-5 flex items-center justify-center relative">
			{isChange && (
				<button
					className="absolute top-2 right-50 bg-blue-500 py-1 px-2 text-white rounded"
					onClick={() => onEditQuiz(id)}
				>
					Change
				</button>
			)}
			{isDelete && (
				<button
					className="absolute top-2 right-2 bg-red-500 py-1 px-2 text-white rounded"
					onClick={(e) => {
						e.stopPropagation();
						handleDeleteQuiz(id);
					}}
				>
					Delete
				</button>
			)}
			<Link
				to={`quiz/${id}`}
				onClick={handleAddQuizToArray}
				className="text-center"
			>
				{name}
			</Link>
		</div>
	);
};
