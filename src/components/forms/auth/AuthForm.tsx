import { useState } from 'react';
import { Button } from '../../common/button/Button';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

type Mode = 'signIn' | 'signUp';

const authModeToHeaderMap: Record<Mode, string> = {
	signIn: 'Введите свои учетные данные',
	signUp: 'Создать новый аккаунт',
};

const authModeToSuggestionMap: Record<Mode, string> = {
	signIn: 'У вас нет учетной записи?',
	signUp: 'У вас уже есть аккаунт?',
};

const authModeToChangeButtonMap: Record<Mode, string> = {
	signIn: 'Создать новый аккаунт',
	signUp: 'Авторизация',
};

export const AuthForm = () => {
	const [mode, setMode] = useState<Mode>('signIn');

	return (
		<div
			className="flex text-black rounded-sm"
			style={{
				backgroundColor: 'rgba(252, 252, 252, 0.85)',
			}}
		>
			<div className="flex flex-col space-y-12 py-24 px-16">
				<h2 className="text-2xl font-semibold text-black">{authModeToHeaderMap[mode]}</h2>
				{
					{
						signIn: <SignInForm />,
						signUp: <SignUpForm />,
					}[mode]
				}
			</div>
			<div className="py-24 px-16 flex bg-gold">
				<div className="text-white flex flex-col items-center justify-center">
					<h2 className="font-semibold text-2xl mb-6">{authModeToSuggestionMap[mode]}</h2>
					<Button
						onClick={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
						className="border-gray-100 border-2 authButton bg-gold-hover"
					>
						{authModeToChangeButtonMap[mode]}
					</Button>
				</div>
			</div>
		</div>
	);
};
