import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Option = {
	answer: string;
	isCorrect: boolean;
};

type Question = {
	question: string;
	options: Option[];
};

type Props = {
	id: number;
	name: string;
	questions: Question[];
};

type QuizProps = {
	quiz: Props[];
};

const initialState: QuizProps = {
	quiz: []
};

const quizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		addQuizToArray: (state, action: PayloadAction<Props>) => {
			state.quiz.push(action.payload);
		}
	}
});

export default quizSlice.reducer;
export const { addQuizToArray } = quizSlice.actions;
