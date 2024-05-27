import React, { useEffect, useState } from 'react';

interface QuestionOption {
	answer: string;
	isCorrect: boolean;
}

interface Question {
	id: number;
	question: string;
	options: QuestionOption[];
	isDelete: boolean;
	isChange: boolean;
}

interface Quiz {
	id: number;
	name: string;
	questions: Question[];
}

interface ModalWindowProps {
	onSubmit: (quiz: Quiz) => void;
	handleOpenModalWindow: () => void;
	initialQuiz?: Quiz;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
	onSubmit,
	handleOpenModalWindow,
	initialQuiz
}) => {
	const [quizName, setQuizName] = useState<string>('');
	const [questions, setQuestions] = useState<Question[]>([
		{
			id: 1,
			question: '',
			options: [
				{ answer: '', isCorrect: false },
				{ answer: '', isCorrect: false }
			],
			isDelete: true,
			isChange: true
		}
	]);

	useEffect(() => {
		if (initialQuiz) {
			setQuizName(initialQuiz.name);
			setQuestions(initialQuiz.questions);
		}
	}, [initialQuiz]);

	const handleQuizNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuizName(e.target.value);
	};

	const handleQuestionChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const newQuestions = [...questions];
		newQuestions[index].question = e.target.value;
		setQuestions(newQuestions);
	};

	const handleOptionChange = (
		questionIndex: number,
		optionIndex: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const newQuestions = [...questions];
		newQuestions[questionIndex].options[optionIndex].answer = e.target.value;
		setQuestions(newQuestions);
	};

	const handleIsCorrectChange = (
		questionIndex: number,
		optionIndex: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const newQuestions = [...questions];
		newQuestions[questionIndex].options[optionIndex].isCorrect =
			e.target.checked;
		setQuestions(newQuestions);
	};

	const handleAddAnswer = (questionIndex: number) => {
		if (questions[questionIndex].options.length < 5) {
			const newQuestions = [...questions];
			newQuestions[questionIndex].options.push({
				answer: '',
				isCorrect: false
			});
			setQuestions(newQuestions);
		}
	};

	const handleRemoveAnswer = (questionIndex: number, optionIndex: number) => {
		if (questions[questionIndex].options.length > 2) {
			const newQuestions = [...questions];
			newQuestions[questionIndex].options.splice(optionIndex, 1);
			setQuestions(newQuestions);
		}
	};

	const handleAddQuestion = () => {
		const newQuestion: Question = {
			id: questions.length + 1,
			question: '',
			options: [
				{ answer: '', isCorrect: false },
				{ answer: '', isCorrect: false }
			],
			isDelete: true,
			isChange: true
		};
		setQuestions([...questions, newQuestion]);
	};

	const handleRemoveQuestion = (index: number) => {
		if (questions.length > 1) {
			const newQuestions = [...questions];
			newQuestions.splice(index, 1);
			setQuestions(newQuestions);
		}
	};

	const handleResetForm = () => {
		setQuizName('');
		setQuestions([
			{
				id: 1,
				question: '',
				options: [
					{ answer: '', isCorrect: false },
					{ answer: '', isCorrect: false }
				],
				isDelete: true,
				isChange: true
			}
		]);
	};

	const handleSubmit = () => {
		const newQuiz = {
			id: initialQuiz ? initialQuiz.id : Date.now(),
			name: quizName,
			questions,
			isDelete: true,
			isChange: true
		};
		onSubmit(newQuiz);
		handleResetForm();
		handleOpenModalWindow();
	};

	const handleClose = () => {
		handleResetForm();
		handleOpenModalWindow();
	};

	return (
		<div className="absolute flex justify-center items-center left-0 top-0 w-full h-full bg-black bg-opacity-50 z-10">
			<div className="bg-white w-[57rem] h-auto p-8 rounded-md relative z-50">
				<div className="flex justify-between">
					<h1 className="text-black text-2xl mb-4">
						{initialQuiz ? 'Edit Quiz' : 'Create a New Quiz'}
					</h1>
					<button onClick={handleClose} className="text-black">
						X
					</button>
				</div>
				<div className="mb-4">
					<p className="block text-gray-700 text-sm font-bold mb-2">
						Quiz Name
					</p>
					<input
						type="text"
						value={quizName}
						onChange={handleQuizNameChange}
						placeholder="Quiz name"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				{questions.map((question, index) => (
					<div key={question.id} className="mb-6">
						<div className="flex justify-between items-center mb-2">
							<p className="block text-gray-700 text-sm font-bold">
								Question {index + 1}
							</p>
							{questions.length > 1 && (
								<button
									onClick={() => handleRemoveQuestion(index)}
									className="ml-2 bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
								>
									Remove Question
								</button>
							)}
						</div>
						<input
							type="text"
							value={question.question}
							onChange={(e) => handleQuestionChange(index, e)}
							placeholder="Question"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{question.options.map((option, oIndex) => (
							<div key={oIndex} className="flex items-center mb-2">
								<input
									type="text"
									value={option.answer}
									onChange={(e) => handleOptionChange(index, oIndex, e)}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mr-2 leading-tight focus:outline-none focus:shadow-outline"
									placeholder={`Option ${oIndex + 1}`}
								/>
								<p className="inline-flex items-center">
									<input
										type="checkbox"
										checked={option.isCorrect}
										onChange={(e) => handleIsCorrectChange(index, oIndex, e)}
										className="form-checkbox h-5 w-5 text-blue-600"
									/>
									<span className="ml-2 text-gray-700">Correct</span>
								</p>
								{oIndex === question.options.length - 1 && (
									<button
										onClick={() => handleAddAnswer(index)}
										className="ml-2 bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
									>
										Add Answer
									</button>
								)}
								{oIndex > 1 && (
									<button
										onClick={() => handleRemoveAnswer(index, oIndex)}
										className="ml-2 bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
									>
										Remove Answer
									</button>
								)}
							</div>
						))}
					</div>
				))}
				<button
					className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
					onClick={handleAddQuestion}
				>
					Add Question
				</button>
				<button
					className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					onClick={handleSubmit}
				>
					Done
				</button>
			</div>
		</div>
	);
};
