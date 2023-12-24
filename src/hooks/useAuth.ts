import { useCallback, useMemo } from 'react';
import { supabase } from '../supabase/client';
import { SignInData, SignUpData } from '../typings/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
		const { email, password, username, repeatPassword } = userData;
		if (password !== repeatPassword) {
			return;
		}

		const { data, error } = await supabase.from('users').select().eq('email', email);

		const isEmailTaken = data?.length !== 0 || !error;

		if (isEmailTaken) {
			toast.warning('Эта почта уже используется');
			return;
		}

		await supabase.auth
			.signUp({
				email,
				password,
			})
			.then(async (res) => {
				// TODO если мы хотим зарегистрировать нового пользователя
				// с почтой, которая уже существует, то тут должна прилетать ошибка
				// но она не прилетает, поэтому приходится в ручную делать проверку сверху...
				if (res.error) {
					toast.warning(res.error.message);
					return;
				}

				await supabase
					.from('users')
					.insert({
						name: username,
						email,
					})
					.then((res) => {
						if (res.error) {
							toast.warning(res.error.message);
							return;
						}
						toast.success('Вы успешно зарегистрированы');
						onSuccess?.();
					});
			})
			.catch((err) => {
				toast.warning((err as Error).message);
			});
	}, []);

	const signIn = useCallback(
		async (userData: SignInData, onSuccess?: () => void) => {
			const { email, password } = userData;

			await supabase.auth
				.signInWithPassword({
					email,
					password,
				})
				.then((res) => {
					if (res.error) {
						toast.warning(res.error.message);
						return;
					}

					onSuccess?.();
					navigate('/');
					toast.success('Добро пожаловать!');
				})
				.catch((err) => {
					toast.warning((err as Error).message);
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
