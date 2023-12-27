import { supabase } from '../supabase/client';
import { DBCard } from '../typings/card';
import { DBUser, User } from '../typings/user';
import { PickSelected } from '../typings/utils';
import { convertToSelect } from '../utils/api/convertToSelect';
import cardService from './cardService';
import characterService from './characterService';
import { Options, Service } from './service';

// TODO при me() запросе, возвращаем полную дату...

class UserService extends Service<User, DBUser> {
	async getById<
		E extends DBUser,
		T extends Options<E>,
		R extends PickSelected<E, T['select']>,
	>(id: number, options?: T): Promise<R | null> {
		const select = options?.select;

		return supabase
			.from('users')
			.select(convertToSelect(select))
			.eq('id', id)
			.maybeSingle<R>()
			.then((res) => res.data);
	}

	async me(): Promise<DBUser | null> {
		return supabase.auth
			.getUser()
			.then((res) => res.data)
			.then(({ user }) => {
				if (user === null) {
					return null;
				}
				const { email } = user;

				if (!email) {
					return null;
				}

				return supabase
					.from('users')
					.select('*')
					.eq('email', email)
					.maybeSingle<DBUser>()
					.then((res) => res.data);
			});
	}

	async getMyCards<
		O extends Options<DBCard>,
		R extends PickSelected<DBCard, O['select']>,
	>(options?: O): Promise<any[]> {
		const me = await this.me();
		if (me === null) {
			return [];
		}
		return Promise.all(
			(await cardService.getListByOwnerId(me.id, options)).map(
				async (card) => {
					const { character_id, ...rest } = card;
					const character = await characterService.getById(character_id!);
					return {
						...rest,
						character,
					};
				},
			),
		);
	}
}

export default new UserService();
