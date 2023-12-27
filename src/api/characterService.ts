import { supabase } from '../supabase/client';
import { Character, DBCharacter } from '../typings/character';
import { PickSelected } from '../typings/utils';
import { convertToSelect } from '../utils/api/convertToSelect';
import { Options, Service } from './service';

class CharacterService extends Service<Character, DBCharacter> {
	async getById<
		E extends DBCharacter,
		O extends Options<E>,
		R extends PickSelected<E, O['select']>,
	>(id: number, options?: O): Promise<R | null> {
		const select = options?.select;

		return supabase
			.from('characters')
			.select(convertToSelect(select))
			.eq('id', id)
			.maybeSingle<R>()
			.then((res) => res.data);
	}

	async getList<
		E extends DBCharacter,
		O extends Options<E>,
		R extends PickSelected<E, O['select']>,
	>(ids: number[], options?: O): Promise<R[]> {
		const select = options?.select;
		return supabase
			.from('characters')
			.select(convertToSelect(select))
			.in('id', ids)
			.returns<R[]>()
			.then((res) => res.data ?? []);
	}
}

export default new CharacterService();
