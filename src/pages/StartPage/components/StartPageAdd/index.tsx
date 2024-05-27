import React from 'react';
import { ModalWindow } from '../ModalWindow';

interface Props {
	handleOpenModalWindow: () => void;
	isOpen: boolean;
	handleNewQuiz: () => void;
}

export const StartPageAdd: React.FC<Props> = ({
	handleOpenModalWindow,
	isOpen,
	handleNewQuiz
}) => {
	return (
		<div className="flex justify-between mt-5 items-center text-white">
			<p>Select Quiz</p>
			<button
				onClick={handleOpenModalWindow}
				className="bg-blue-500 p-2 rounded-md"
			>
				Add Own Quiz
			</button>
			{isOpen && (
				<ModalWindow
					onSubmit={handleNewQuiz}
					handleOpenModalWindow={handleOpenModalWindow}
				/>
			)}
		</div>
	);
};
