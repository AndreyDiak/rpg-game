import { UserResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/client';

// TODO при me() запросе, возвращаем полную дату...

class AuthService {
	async me(): Promise<UserResponse['data']['user']> {
		return supabase.auth.getUser().then((res) => res.data.user);
	}
}

export default new AuthService();
