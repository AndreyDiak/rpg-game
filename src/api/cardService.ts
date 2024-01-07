import { Card, DBCard, PCard } from '../typings/card';
import { Update } from '../typings/utils';
import { CardPatcher } from '../utils/Patcher/CardPatcher';
import { supabase } from './../supabase/client';
import characterService from './characterService';
import { Service } from './service';

class CardService<E extends PCard, D extends DBCard> extends Service<E> {
	async getByID(id: number) {
		return supabase
			.from('cards')
			.select()
			.eq('id', id)
			.single<D>()
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

	async update(data: Update<Card>) {
		const patchedData = CardPatcher.convertToApiFromUpdate(
			data,
		) as Partial<D>;

		return supabase
			.from('cards')
			.update<Partial<D>>({ ...patchedData })
			.eq('id', data.id)
			.select('*')
			.single<D>()
			.then(({ data }) => (data ? this.patch(data) : null));
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
