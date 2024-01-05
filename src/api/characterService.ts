import { supabase } from '../supabase/client';
import { DBCharacter } from '../typings/character';
import { Service } from './service';

class CharacterService<E extends DBCharacter> extends Service<E> {
	async getByID(id: number) {
		return supabase
			.from('characters')
			.select()
			.eq('id', id)
			.maybeSingle<E>()
			.then((res) => res.data);
	}

	async getByIDs(ids: number[]) {
		return supabase
			.from('characters')
			.select()
			.in('id', ids)
			.returns<E[]>()
			.then((res) => res.data ?? []);
	}
}

export default new CharacterService();
