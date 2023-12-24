import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, ButtonProps } from '../button/Button';

export const SubmitButton = memo(
	({ children, variant = 'primary', disabled, className, ...rest }: ButtonProps) => {
		const {
			formState: { isValid, isSubmitting },
		} = useFormContext();

		const isDisabled = disabled || !isValid || isSubmitting;

		className += isDisabled ? ' bg-gold-lighten' : ' bg-gold bg-gold-hover';

		return (
			<Button
				type="submit"
				variant={variant}
				disabled={isDisabled}
				className={className}
				{...rest}
			>
				{isSubmitting && 'loading...'}
				{children}
			</Button>
		);
	},
);
