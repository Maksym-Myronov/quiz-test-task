import { Route, Routes } from 'react-router-dom';
import { StartPage } from './pages/StartPage';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<StartPage />} />
		</Routes>
	);
};
