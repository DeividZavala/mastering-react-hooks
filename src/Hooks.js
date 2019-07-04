import { useEffect, useState } from 'react';

export const useLocalStorage = (key, defaultValue, callback) => {
	const initialValue = () => {
		const valuesFromStorage = JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
		if(callback){
			callback(valuesFromStorage);
		}
		return valuesFromStorage;
	};
	const [storage, setStorage] = useState(initialValue);
	useEffect(
		() => {
			localStorage.setItem(key, JSON.stringify(storage));
		},
		[storage]
	);
	return [storage, setStorage];
};

export const useDocumentTitle = title => {
	useEffect(() => {
		document.title = title
	}, [title]);
};

export const useKeyDown = (map, defaultValue) => {
	const [match, setMatch] = useState(defaultValue);
	useEffect(() => {
		const handleKey = ({ key }) => {
			setMatch(prevMatch =>
				Object.keys(map).some(k => k === key) ? map[key] : prevMatch
			);
		};
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, []);
	return [match, setMatch]
};
