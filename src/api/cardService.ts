import { supabase } from '../supabase/client';
import { Card, DBCard } from '../typings/card';
import { PickSelected } from '../typings/utils';
import { convertToSelect } from '../utils/api/convertToSelect';
import { Options, Service } from './service';

class CardService extends Service<Card, DBCard> {
	async getById<
		E extends DBCard,
		O extends Options<E>,
		R extends PickSelected<E, O['select']>,
	>(id: number, options?: O): Promise<R | null> {
		const select = options?.select;

		return supabase
			.from('cards')
			.select(convertToSelect(select))
			.eq('id', id)
			.maybeSingle<R>()
			.then((res) => res.data);
		// .then((data) => CardConverter.convertFromApi(data));
	}

	async getListByOwnerId<
		E extends DBCard,
		O extends Options<E>,
		R extends PickSelected<E, O['select']>,
	>(ownerId: number, options?: O): Promise<R[]> {
		const select = options?.select;
		return supabase
			.from('cards')
			.select(convertToSelect(select))
			.eq('owner_id', ownerId)
			.returns<R[]>()
			.then((res) => res.data ?? []);
	}
}

export default new CardService();
