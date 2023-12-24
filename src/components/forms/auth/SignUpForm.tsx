import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { SignUpData } from '../../../typings/auth';
import { validateEmail, validateLength } from '../../../utils/validation/validate';
import { Form, FormField } from '../../common/form';
import { AuthButton } from './AuthButton';
import { useState } from 'react';

export const SignUpForm = () => {
	const { signUp } = useAuth();

	const [isApprove, setIsApprove] = useState(false);

	const defaultValues: SignUpData = {
		username: '',
		email: '',
		password: '',
		repeatPassword: '',
	};

	const form = useForm({
		defaultValues,
		mode: 'all',
	});
	const { register, watch } = form;

	const password = watch('password');

	const onSubmit: SubmitHandler<SignUpData> = async (data) => {
		await signUp(data, () => {
			setIsApprove(true);
		});
	};

	if (isApprove) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<h2 className="text-2xl font-normal">Подтвердите аккаунт по почте...</h2>
			</div>
		);
	}

	return (
		<Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4">
			<FormField
				{...register('username', {
					validate: (v) =>
						validateLength(v.length, {
							min: 4,
							max: 16,
						}),
				})}
				title="Имя пользователя"
				defaultClassName="authInput"
				required
			/>
			<FormField
				{...register('email', {
					validate: (v) => validateEmail(v),
				})}
				title="Эл. Почта"
				defaultClassName="authInput"
				required
			/>
			<FormField
				{...register('password', {
					validate: (v) =>
						validateLength(v.length, {
							min: 6,
						}),
					required: true,
				})}
				title="Пароль"
				type="password"
				defaultClassName="authInput"
				required
			/>
			<FormField
				{...register('repeatPassword', {
					validate: (v) => (v === password ? undefined : 'Пароли не совпадают'),
				})}
				title="Повтор пароля"
				type="password"
				defaultClassName="authInput"
				required
			/>
			<AuthButton>Регистрация</AuthButton>
		</Form>
	);
};
