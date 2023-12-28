import { useEffect } from 'react';
import userService from '../../api/userService';

export const CardsRoute = () => {
	const load = async () => {
		const user = await userService.me();
		console.log({ user });
	};

	useEffect(() => {
		load();
	}, []);

	// useCards();

	return <div>{/* типо рендрим карты пользователя... */}</div>;
};
