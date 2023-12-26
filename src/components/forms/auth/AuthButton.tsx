import { PropsWithChildren, memo } from 'react';
import { SubmitButton } from '../../common/form/SubmitButton';

export const AuthButton = memo(({ children }: PropsWithChildren) => {
	return (
		<SubmitButton type='submit' className='authButton text-white cursor-pointer mt-6'>
			{children}
		</SubmitButton>
	);
});
