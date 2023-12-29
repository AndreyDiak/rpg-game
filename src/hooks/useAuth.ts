import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../api/authService';
import { supabase } from '../supabase/client';
import { SignInData, SignUpData } from '../typings/auth';

type ProviderType = 'google';

interface UseAuth {
	signUp(userData: SignUpData, onSuccess?: () => void): Promise<void>;
	signIn(userData: SignInData, onSuccess?: () => void): Promise<void>;
	signInWithProvider(providerType: ProviderType): Promise<void>;
	signOut(): Promise<void>;
}

// const providerMap: Record<ProviderType, AuthProvider> = {
// 	google: googleProvider,
// 	facebook: facebookProvider,
// 	twitter: twitterProvider,
// };

export function useAuth(): UseAuth {
	const navigate = useNavigate();

	const signUp = useCallback(async (userData: SignUpData, onSuccess?: () => void) => {
		const { email, password, repeatPassword } = userData;
		if (password !== repeatPassword) {
			return;
		}

		const { data, error } = await supabase.from('users').select().eq('email', email);

		const isEmailTaken = data?.length !== 0 || !error;

		if (isEmailTaken) {
			toast.warning('Эта почта уже используется');
			return;
		}

		await authService.signUp(userData).then((res) => {
			if (!res) {
				toast.warning('Неизвестная ошибка');
				return;
			}
			if (res.error) {
				toast.warning(res.error.message);
				return;
			}
			toast.success('Вы успешно зарегистрированы');
			onSuccess?.();
		});
	}, []);

	const signIn = useCallback(
		async (userData: SignInData, onSuccess?: () => void) => {
			await authService.signIn(userData).then((res) => {
				if (res.error) {
					toast.warning(res.error.message);
					return;
				}
				onSuccess?.();
				navigate('/');
				toast.success('Добро пожаловать!');
			});
		},
		[navigate],
	);

	const signOut = useCallback(async () => {
		await supabase.auth.signOut();
		navigate('/auth');
	}, [navigate]);

	const signInWithProvider = useCallback(async (providerType: ProviderType) => {
		// await signInWithPopup(auth, providerMap[providerType]);
	}, []);

	return useMemo(() => {
		return {
			signIn,
			signInWithProvider,
			signUp,
			signOut,
		};
	}, [signIn, signInWithProvider, signOut, signUp]);
}
