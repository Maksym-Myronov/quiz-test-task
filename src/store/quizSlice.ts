import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Option = {
	answer: string;
	isCorrect: boolean;
};

type Question = {
	id: number;
	question: string;
	options: Option[];
};

type Props = {
	id: number;
	name: string;
	questions: Question[];
	isDelete?: boolean;
	isChange?: boolean;
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
		setQuizArray: (state, action: PayloadAction<Props>) => {
			state.quiz = [action.payload];
		}
	}
});

export default quizSlice.reducer;
export const { setQuizArray } = quizSlice.actions;
