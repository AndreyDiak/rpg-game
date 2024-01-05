import { supabase } from '../supabase/client';
import { DBCard } from '../typings/card';
import { DBCharacter } from '../typings/character';
import { DBUser, UserCard } from '../typings/user';
import { groupBy } from '../utils/functions/groupBy';
import authService from './authService';
import cardService from './cardService';
import characterService from './characterService';
import { Service } from './service';

type MeUser = Omit<DBUser, 'cards_ids'> & { cards: UserCard[] };

class UserService<E extends DBUser> extends Service<E> {
	async getByID(id: number) {
		return supabase
			.from('users')
			.select()
			.eq('id', id)
			.maybeSingle<E>()
			.then((res) => res.data);
	}

	async getByEmail(email: string) {
		return supabase
			.from('users')
			.select()
			.eq('email', email)
			.maybeSingle<E>()
			.then((res) => res.data);
	}

	async getByIDs(ids: number[]) {
		return supabase
			.from('users')
			.select()
			.in('id', ids)
			.maybeSingle<E[]>()
			.then((res) => res.data ?? []);
	}

	async me(): Promise<MeUser | null> {
		return authService.me().then(async (data) => {
			if (data === null) {
				return null;
			}
			const { email } = data;

			if (!email) {
				return null;
			}

			const user = await this.getByEmail(email);

			if (!user) {
				return null;
			}

			const user_cards: DBCard[] = await cardService.getByIDs(
				user.cards_ids,
			);
			const characters: DBCharacter[] = await characterService.getByIDs(
				user_cards.map((card) => card.character_id),
			);
			const grouped = groupBy(characters, (v) => v.id);

			const patchedCards = user_cards.map((card) => {
				const { character_id, ...rest } = card;
				return {
					character: grouped[character_id][0],
					...rest,
				};
			});

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { cards_ids, ...rest } = user;
			return {
				...rest,
				cards: patchedCards,
			};
		});
	}
}

export default new UserService();
