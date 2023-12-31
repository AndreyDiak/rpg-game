import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { SignInData } from '../../../typings/auth';
import { validateEmail, validateLength } from '../../../utils/validation/validate';
import { Form, FormField } from '../../common/form';
import { AuthButton } from './AuthButton';

export const SignInForm = () => {
	const { signIn } = useAuth();

	const defaultValues: SignInData = {
		email: '',
		password: '',
	};

	const form = useForm({
		defaultValues,
		mode: 'all',
	});
	const { register } = form;

	const onSubmit: SubmitHandler<SignInData> = async (data) => {
		await signIn(data);
	};

	return (
		<Form form={form} onSubmit={onSubmit} className='flex flex-col gap-4'>
			<FormField
				{...register('email', {
					validate: (v) => validateEmail(v),
				})}
				title='Эл. Почта'
				defaultClassName='authInput'
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
				title='Пароль'
				type='password'
				defaultClassName='authInput'
				required
			/>
			<AuthButton>Авторизация</AuthButton>
		</Form>
	);
};
