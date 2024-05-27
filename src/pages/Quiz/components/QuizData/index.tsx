import React, { useEffect, useState } from 'react';
import { QuizQuestions } from '../QuizQuestions';
import { QuizResults } from '../QuizResults';

interface Props {
	questions: {
		id: number;
		question: string;
		options: {
			answer: string;
			isCorrect: boolean;
		}[];
	}[];
}

export const QuizData: React.FC<Props> = ({ questions }) => {
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [isCorrectAnswerSelected, setIsCorrectAnswerSelected] = useState<
		boolean | null
	>(null);
	const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
	const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
	const [totalTime, setTotalTime] = useState<number>(0);
	const [timer, setTimer] = useState<number>(0);

	useEffect(() => {
		if (!quizCompleted) {
			const interval = setInterval(() => {
				setTimer((prev) => prev + 1);
				setTotalTime((prev) => prev + 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [quizCompleted]);

	const handleAnswerSelect = (answer: string, isCorrect: boolean) => {
		setSelectedAnswer(answer);
		setIsCorrectAnswerSelected(isCorrect);
	};

	const handleNextPage = () => {
		if (selectedAnswer !== null) {
			if (isCorrectAnswerSelected) {
				setCorrectAnswersCount((prev) => prev + 1);
			}

			if (currentQuestion + 1 < questions.length) {
				setCurrentQuestion((prev) => prev + 1);
				setSelectedAnswer(null);
				setIsCorrectAnswerSelected(null);
			} else {
				setQuizCompleted(true);
			}
		} else {
			alert('Please select an answer before proceeding to the next question.');
		}
	};

	return (
		<div>
			{quizCompleted ? (
				<QuizResults
					correctAnswersCount={correctAnswersCount}
					totalTime={totalTime}
				/>
			) : (
				<div className="text-black mt-5 bg-white w-[44rem] p-5">
					<h2>Question {currentQuestion + 1}</h2>
					<p>{questions[currentQuestion].question}</p>
					{questions[currentQuestion].options.map((item) => (
						<QuizQuestions
							key={item.answer}
							answer={item.answer}
							onClick={() => handleAnswerSelect(item.answer, item.isCorrect)}
						/>
					))}
					<button
						className="bg-blue-500 pt-2 pb-2 pr-6 pl-6 rounded-md ml-5 mt-4"
						onClick={handleNextPage}
					>
						Next
					</button>
					<p>Time: {timer} seconds</p>
				</div>
			)}
		</div>
	);
};
