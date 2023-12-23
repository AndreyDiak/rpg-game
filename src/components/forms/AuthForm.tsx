import { SubmitHandler, useForm } from 'react-hook-form';
import { validateEmail, validateLength } from '../../utils/validation/validate';
import { Form } from '../common/form/Form';
import { FormField } from '../common/form/FormField';

export const AuthForm = () => {
	const defaultValues = {
		username: '',
		email: '',
		password: '',
		passwordRepeat: '',
	};
	const form = useForm({
		defaultValues,
		mode: 'all',
	});
	const { register, watch } = form;

	const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
		console.log(data);
	};

	const password = watch('password');
	return (
		<Form form={form} onSubmit={onSubmit} className="">
			<FormField
				{...register('username', {
					validate: (v) =>
						validateLength(v.length, {
							min: 4,
							max: 10,
						}),
				})}
				placeholder="Имя пользователя"
				required
			/>
			<FormField
				{...register('email', {
					validate: (v) => validateEmail(v),
				})}
				placeholder="эл. почта"
				required
			/>
			<FormField {...register('password')} placeholder="Пароль" type="password" required />
			<FormField
				{...register('passwordRepeat', {
					validate: (v) => (v === password ? undefined : 'Пароли не совпадают'),
				})}
				placeholder="Пароль"
				type="password"
				required
			/>

			<input type="submit" />
		</Form>
	);
};
