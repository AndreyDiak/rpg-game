import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../../supabase/client';

export function useCards() {
	useEffect(() => {
		supabase.auth.getUser().then(async ({ data: { user } }) => {
			/* TODO запрашиваем все карты, которые есть у пользователя...
        1) получаем сессию пользователя
        2) получаем пользователя из БД
        
        у пользователя в бд будет ссылка на все его карточки
        каждая карточка хранит в себе owner_id для обратной связи с user-ом
        каждая карточка хранит в себе character_id для связки, что за персонаж...
      */
			// await supabase.from('users').select('*').eq('')
			if (!user || !user.email) {
				toast.warning('Не удалось получить данные');
				document.location.reload();
				return;
			}

			const { data } = await supabase.from('users').select('*').eq('email', user.email);
			console.log({ data });
			return null;
		});
	}, []);
}
