import { AuthForm } from '../components/forms/auth/AuthForm';
import backgroundImageUrl from './../assets/images/main_background.jpg';

export const AuthRoute = () => {
	return (
		<div
			className='w-full h-screen flex items-center justify-center'
			style={{
				backgroundSize: 'cover',
				background: `
				linear-gradient(
				rgba(0, 0, 0, 0.7)
				,rgba(0, 0, 0, 0.6)
				), url(${backgroundImageUrl})`,
			}}
		>
			<AuthForm />
		</div>
	);
};
