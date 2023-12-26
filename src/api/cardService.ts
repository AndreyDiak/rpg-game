import { supabase } from '../supabase/client';
import { Card, DBCard } from '../typings/card';
import { Options, ServiceInstance } from './serviceInstance';

class CardService extends ServiceInstance<Card, DBCard> {
	async getById<T extends Options<DBCard>>(
		id: number,
		options?: T,
	): Promise<ConstructSelectedType<DBCard, T['select']> | null> {
		const select = options?.select;

		return supabase
			.from('cards')
			.select(convertSelect(select))
			.eq('id', id)
			.returns<ConstructSelectedType<DBCard, T['select']>[]>()
			.then((res) => res.data && res.data[0]);
		// .then((data) => CardConverter.convertFromApi(data));
	}
}

export type ConstructSelectedType<
	T extends object,
	U extends readonly (keyof T)[] | undefined,
> = U extends undefined ? T : U extends unknown[] ? Pick<T, U[number]> : T;

function convertSelect<T extends object>(
	select: (keyof T)[] | undefined,
): string {
	if (!select || select.length === 0) {
		return '*';
	}

	return select.join(', ');
}

export default new CardService();
