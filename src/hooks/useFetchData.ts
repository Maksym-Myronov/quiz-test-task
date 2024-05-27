// import { useEffect, useState } from 'react';
// import data from '../api/data.json';
//
// interface Params {
// 	id: number;
// 	name: string;
// 	questions: {
// 		id: number;
// 		question: string;
// 		options: {
// 			answer: string;
// 			isCorrect: boolean;
// 		}[];
// 	}[];
// 	isDelete?: boolean;
// }
//
// const useFetchData = () => {
// 	const [dataFromApi, setDataFromApi] = useState<Params[]>([]);
//
// 	useEffect(() => {
// 		const savedData = localStorage.getItem('quizzes');
// 		if (savedData) {
// 			setDataFromApi(JSON.parse(savedData));
// 		} else {
// 			setDataFromApi(data);
// 			localStorage.setItem('quizzes', JSON.stringify(data));
// 		}
// 	}, []);
//
// 	return { dataFromApi, setDataFromApi };
// };
//
// export default useFetchData;
