import { PropsWithChildren, memo } from 'react';
import { SubmitButton } from '../../common/form/SubmitButton';

export const AuthButton = memo(({ children }: PropsWithChildren) => {
	return (
		<SubmitButton type='submit' className='mt-6' variant='secondary'>
			{children}
		</SubmitButton>
	);
});
