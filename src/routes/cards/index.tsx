import { useEffect } from 'react';
import userService from '../../api/userService';

export const CardsRoute = () => {
	const load = async () => {
		const data = await userService.getMyCards({
			// select: ['id', 'character_id', 'level'],
		});
		// const user = await userService.me();
		// console.log({ user });
		console.log({ data });
	};

	useEffect(() => {
		load();
	}, []);

	// useCards();

	return <div>{/* типо рендрим карты пользователя... */}</div>;
};
