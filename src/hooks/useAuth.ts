import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../api/authService';
import userService from '../api/userService';
import { setUser, userSelector } from '../slices/authSlice';
import { supabase } from '../supabase/client';
import { AuthUser, SignInData, SignUpData } from '../typings/auth';

interface UseAuth {
	user: AuthUser | null;
	signUp(userData: SignUpData, onSuccess?: () => void): Promise<void>;
	signIn(userData: SignInData, onSuccess?: () => void): Promise<void>;
	signOut(): Promise<void>;
}

export function useAuth(): UseAuth {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const rawUser = useSelector(userSelector);

	const signUp = useCallback(
		async (userData: SignUpData, onSuccess?: () => void) => {
			const { email, password, repeatPassword } = userData;
			if (password !== repeatPassword) {
				return;
			}

			const { data, error } = await supabase
				.from('users')
				.select()
				.eq('email', email);

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
		},
		[],
	);

	const signIn = useCallback(
		async (userData: SignInData, onSuccess?: () => void) => {
			await authService.signIn(userData).then((res) => {
				if (res.error) {
					toast.warning(res.error.message);
					return;
				}

				const {
					data: {
						user: { email },
					},
				} = res;

				if (!email) {
					return;
				}
				// получаем юзера по email
				userService.getByEmail(email).then((data) => {
					if (!data) {
						return;
					}
					dispatch(
						setUser({
							user: {
								id: data.id,
								email: data.email,
							},
						}),
					);
					onSuccess?.();
					navigate('/');
					toast.success('Добро пожаловать!');
				});
			});
		},
		[dispatch, navigate],
	);

	const signOut = useCallback(async () => {
		await supabase.auth.signOut();
		navigate('/auth');
	}, [navigate]);

	useEffect(() => {
		supabase.auth.getUser().then(async ({ data }) => {
			if (!data || !data.user?.email) {
				return;
			}

			const user = await userService.getByEmail(data.user?.email);

			if (!user) {
				return;
			}

			const { id, email } = user;
			dispatch(setUser({ user: { id, email } }));
		});
	}, [dispatch]);

	return useMemo(() => {
		return {
			user: rawUser,
			signIn,
			signUp,
			signOut,
		};
	}, [rawUser, signIn, signOut, signUp]);
}
