import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { StartPage } from './pages/StartPage';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<StartPage />} />
			</Route>
		</Routes>
	);
};
