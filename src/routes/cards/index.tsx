import { useCards } from '../../hooks/cards/useCards';

export const CardsRoute = () => {
	// const onClickHandler = async () => {
	// 	await supabase.from('users').insert({
	// 		email: 'hello@example.com',
	// 		name: 'John',
	// 	});
	// };

	// useEffect(() => {
	// 	const load = async () => {
	// 		const { data } = await supabase.from('characters').select();
	// 		console.log({ data });
	// 	};
	// 	load();
	// }, []);

	useCards();

	return <div>{/* типо рендрим карты пользователя... */}</div>;
};
