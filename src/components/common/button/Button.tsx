import {
	ButtonHTMLAttributes,
	CSSProperties,
	forwardRef,
	useState,
} from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

const variantToStyleMap: Record<ButtonVariant, CSSProperties> = {
	secondary: {
		backgroundColor: 'var(--color-bg-gold-lighten)',
	},
	primary: {
		backgroundColor: 'var(--color-bg-gold-darken)',
	},
	outline: {
		backgroundColor: 'transparent',
		border: '1px solid #ffffff',
		outline: 'none',
		color: '#ffffff',
	},
};

const variantToHoverStyleMap: Record<ButtonVariant, CSSProperties> = {
	secondary: {
		backgroundColor: 'var(--color-bg-gold-light)',
	},
	primary: {
		backgroundColor: 'var(--color-bg-gold-darken)',
	},
	outline: {
		backgroundColor: 'var(--color-bg-gold-darken)',
		borderColor: 'var(--color-bg-gold-darken)',
		outline: 'none',
	},
};

const sizeToStyleMap: Record<ButtonSize, CSSProperties> = {
	sm: {
		padding: '8px 12px',
		borderRadius: '2px',
	},
	md: {
		padding: '10px 14px',
		borderRadius: '4px',
	},
	lg: {
		padding: '12px 16px',
		borderRadius: '6px',
	},
	xl: {
		padding: '14px 18px',
		borderRadius: '8px',
	},
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			size = 'md',
			variant = 'primary',
			color = 'white',
			disabled,
			children,
			style,
			...rest
		},
		ref,
	) => {
		const [isHovering, setIsHovering] = useState(false);

		const computedStyle = isHovering
			? { ...variantToHoverStyleMap[variant] }
			: { ...variantToStyleMap[variant] };

		return (
			<button
				ref={ref}
				type='button'
				disabled={disabled}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				style={{
					...style,
					cursor: 'pointer',
					color,
					...computedStyle,
					...sizeToStyleMap[size],
				}}
				{...rest}
			>
				{children}
			</button>
		);
	},
);
