import React, { useEffect, useState } from 'react';
import { StartPageQuiz } from './components/StartPageQuiz';
import { StartPageAdd } from './components/StartPageAdd';
import { ModalWindow } from './components/ModalWindow';
import data from '../../api/data.json';

interface Params {
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
	isDelete?: boolean;
	isChange?: boolean;
}

export const StartPage: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentQuiz, setCurrentQuiz] = useState<Params | null>(null);
	const [dataFromApi, setDataFromApi] = useState<Params[]>([]);

	useEffect(() => {
		const savedData = localStorage.getItem('quizzes');
		if (savedData) {
			setDataFromApi(JSON.parse(savedData));
		} else {
			setDataFromApi(data);
			localStorage.setItem('quizzes', JSON.stringify(data));
		}
	}, []);

	const handleDeleteQuiz = (quizId: number) => {
		const updatedData = dataFromApi.filter((quiz) => quiz.id !== quizId);
		setDataFromApi(updatedData);
		localStorage.setItem('quizzes', JSON.stringify(updatedData));
	};
	console.log(dataFromApi);
	const handleOpenModalWindow = () => {
		setIsOpen(!isOpen);
		if (isOpen) {
			setCurrentQuiz(null);
		}
	};

	const handleNewQuiz = (newQuiz: Params) => {
		const updatedData = [...dataFromApi, newQuiz];
		setDataFromApi(updatedData);
		localStorage.setItem('quizzes', JSON.stringify(updatedData));
		handleOpenModalWindow();
	};

	const handleEditQuiz = (updatedQuiz: Params) => {
		const updatedData = dataFromApi.map((quiz) =>
			quiz.id === updatedQuiz.id ? updatedQuiz : quiz
		);
		setDataFromApi(updatedData);
		localStorage.setItem('quizzes', JSON.stringify(updatedData));
		handleOpenModalWindow();
	};

	const handleEditQuizOpen = (quizId: number) => {
		const quizToEdit = dataFromApi.find((quiz) => quiz.id === quizId);
		if (quizToEdit) {
			setCurrentQuiz(quizToEdit);
			setIsOpen(true);
		}
	};

	return (
		<div className="max-w-7xl m-auto">
			<StartPageAdd
				handleNewQuiz={handleNewQuiz}
				isOpen={isOpen}
				handleOpenModalWindow={handleOpenModalWindow}
			/>
			{isOpen && (
				<ModalWindow
					onSubmit={currentQuiz ? handleEditQuiz : handleNewQuiz}
					handleOpenModalWindow={handleOpenModalWindow}
					initialQuiz={currentQuiz}
				/>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
				{dataFromApi.map((item) => (
					<StartPageQuiz
						key={item.id}
						name={item.name}
						id={item.id}
						questions={item.questions}
						handleDeleteQuiz={handleDeleteQuiz}
						onEditQuiz={handleEditQuizOpen}
						isDelete={item.isDelete}
						isChange={item.isChange}
					/>
				))}
			</div>
		</div>
	);
};
