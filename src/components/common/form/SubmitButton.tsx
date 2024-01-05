import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, ButtonProps } from '../button/Button';

export const SubmitButton = memo(
	({
		children,
		variant = 'primary',
		color = 'white',
		disabled,
		className,
		...rest
	}: ButtonProps) => {
		const {
			formState: { isValid, isSubmitting },
		} = useFormContext();

		const isDisabled = disabled || !isValid || isSubmitting;

		return (
			<Button
				type='submit'
				variant={variant}
				disabled={isDisabled}
				color={isDisabled ? '#e3e3e3' : color}
				className={className}
				{...rest}
			>
				{isSubmitting && 'loading...'}
				{children}
			</Button>
		);
	},
);
