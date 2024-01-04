import {
	AuthResponse,
	AuthTokenResponsePassword,
	PostgrestSingleResponse,
	UserResponse,
} from '@supabase/supabase-js';
import { supabase } from '../supabase/client';
import { SignInData, SignUpData } from '../typings/auth';
import { DBUser } from '../typings/user';

type SignUpRes = AuthResponse | PostgrestSingleResponse<DBUser> | null;

class AuthService {
	async me(): Promise<UserResponse['data']['user']> {
		return supabase.auth.getUser().then((res) => res.data.user);
	}

	async signUp(userDto: SignUpData): Promise<SignUpRes> {
		const { email, username, password } = userDto;
		return supabase.auth.signUp({ email, password }).then(async (res) => {
			if (res.error) {
				return res;
			}

			return supabase
				.from('users')
				.insert({ name: username, email, cards_ids: [] })
				.returns<PostgrestSingleResponse<DBUser>>()
				.then((res) => res.data);
		});
	}

	async signIn(userDto: SignInData): Promise<AuthTokenResponsePassword> {
		const { email, password } = userDto;
		return supabase.auth
			.signInWithPassword({ email, password })
			.then((res) => res)
			.catch((err) => err);
	}
}

export default new AuthService();
