import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary';

type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
}

// TODO: Adds styles for button

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ size, variant, disabled, children, ...rest }, ref) => {
		return (
			<button ref={ref} type="button" disabled={disabled} {...rest}>
				{children}
			</button>
		);
	},
);
