import { User } from '@supabase/supabase-js';

export interface SignInData {
	email: string;
	password: string;
}

export interface SignUpData extends SignInData {
	username: string;
	repeatPassword: string;
}

export interface AuthContextData {
	user: User;
}
