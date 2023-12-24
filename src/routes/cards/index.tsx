import { useEffect } from 'react';
import { supabase } from '../../supabase/client';

export const CardsRoute = () => {
	// const onClickHandler = async () => {
	// 	await supabase.from('users').insert({
	// 		email: 'hello@example.com',
	// 		name: 'John',
	// 	});
	// };

	useEffect(() => {
		const load = async () => {
			const { data } = await supabase.from('characters').select();
			console.log({ data });
		};
		load();
	}, []);

	return <div> </div>;
};
