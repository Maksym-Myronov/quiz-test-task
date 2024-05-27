import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { StartPage } from './pages/StartPage';
import { Quiz } from './pages/Quiz';

export const App = () => {
	return (
		<Routes>
			<Route path="/quiz-test-task/" element={<Layout />}>
				<Route index element={<StartPage />} />
				<Route path="quiz/:id" element={<Quiz />} />
			</Route>
		</Routes>
	);
};
