import { supabase } from '../supabase/client';
import { DBCard, PCard } from '../typings/card';
import characterService from './characterService';
import { Service } from './service';

class CardService<E extends PCard, D extends DBCard> extends Service<E> {
	async getByID(id: number) {
		return supabase
			.from('cards')
			.select()
			.eq('id', id)
			.maybeSingle<D>()
			.then(({ data }) => (data ? this.patch(data) : null));
	}

	async getByIDs(ids: number[]) {
		return supabase
			.from('cards')
			.select()
			.in('id', ids)
			.returns<D[]>()
			.then(async ({ data }) => Promise.all<E>(data?.map(this.patch) ?? []));
	}

	async patch(data: D): Promise<E> {
		const { character_id, ...rest } = data;
		return characterService.getByID(character_id).then(
			(character) =>
				({
					...rest,
					character,
				} as unknown as E),
		);
	}
}

export default new CardService();
