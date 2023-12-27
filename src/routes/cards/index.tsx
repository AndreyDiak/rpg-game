import { useEffect } from 'react';
import cardService from '../../api/cardService';

export const CardsRoute = () => {
	// const onClickHandler = async () => {
	// 	await supabase.from('users').insert({
	// 		email: 'hello@example.com',
	// 		name: 'John',
	// 	});
	// };

	const load = async () => {
		const data = await cardService.getById(1, {
			select: ['id', 'level', 'character_id'],
		});

		console.log({ data });
	};

	useEffect(() => {
		load();
	}, []);

	// useCards();

	return <div>{/* типо рендрим карты пользователя... */}</div>;
};
