import { supabase } from '../supabase/client';
import { DBUser, User } from '../typings/user';
import { PickSelected } from '../typings/utils';
import { convertToSelect } from '../utils/api/convertToSelect';
import { groupBy } from '../utils/groupBy';
import authService from './authService';
import cardService from './cardService';
import characterService from './characterService';
import { Options, Service } from './service';

// TODO при me() запросе, возвращаем полную дату...

class UserService extends Service<User, DBUser> {
	async getById<E extends DBUser, T extends Options<E>, R extends PickSelected<E, T['select']>>(
		id: number,
		options?: T,
	): Promise<R | null> {
		const select = options?.select;

		return supabase
			.from('users')
			.select(convertToSelect(select))
			.eq('id', id)
			.maybeSingle<R>()
			.then((res) => res.data);
	}

	async me(): Promise<any | null> {
		return authService.me().then(async (data) => {
			if (data === null) {
				return null;
			}
			const { email } = data;

			if (!email) {
				return null;
			}

			const user = await supabase
				.from('users')
				.select('*')
				.eq('email', email)
				.maybeSingle<DBUser>()
				.then((res) => res.data);

			if (!user) {
				return null;
			}

			const cards = await cardService.getListByOwnerId(user.id);
			const charactersId = cards.map((card) => card.character_id);
			const characters = await characterService.getList(charactersId);
			const grouped = groupBy(characters, (v) => v.id);

			const patchedCards = cards.map((card) => {
				const { character_id, ...rest } = card;
				return {
					character: grouped[character_id][0],
					...rest,
				};
			});

			const { cards_ids, ...rest } = user;
			return {
				...rest,
				cards: patchedCards,
			};
		});
	}
}

export default new UserService();
