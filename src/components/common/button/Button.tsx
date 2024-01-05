import { ButtonHTMLAttributes, forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

type Style<K extends string> = Record<K, Record<string, string | number>>;

const variantToStyleMap: Style<ButtonVariant> = {
	secondary: {
		'background-color': 'var(--color-bg-gold-lighten)',
	},
	primary: {
		'background-color': 'var(--color-bg-gold-darken)',
	},
	outline: {
		'background-color': 'transparent',
		'border-style': 'solid',
		'border-width': 2,
	},
};

const variantToHoverStyleMap: Style<ButtonVariant> = {
	secondary: {
		'background-color': 'var(--color-bg-gold-light)',
	},
	primary: {
		'background-color': 'var(--color-bg-gold-darken)',
	},
	outline: {
		'background-color': 'var(--color-bg-gold-darken)',
		borderColor: 'var(--color-bg-gold-darken)',
		color: '#ffffff',
		outline: 'none',
	},
};

const sizeToStyleMap: Style<ButtonSize> = {
	sm: {
		padding: '8px 12px',
		'border-radius': '2px',
	},
	md: {
		padding: '10px 14px',
		'border-radius': '4px',
	},
	lg: {
		padding: '12px 16px',
		'border-radius': '6px',
	},
	xl: {
		padding: '14px 18px',
		'border-radius': '8px',
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
			...rest
		},
		ref,
	) => {
		const [isHovering, setIsHovering] = useState(false);

		return (
			<StyledButton
				$variant={variant}
				$color={color}
				$size={size}
				$hovering={isHovering}
				ref={ref}
				type='button'
				disabled={disabled}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				{...rest}
			>
				{children}
			</StyledButton>
		);
	},
);

const StyledButton = styled.button<{
	$variant: ButtonVariant;
	$size: ButtonSize;
	$color: string;
	$hovering: boolean;
}>`
	cursor: pointer;
	color: ${(props) => props.$color};
	${(props) => variantToStyleMap[props.$variant]};
	${(props) => sizeToStyleMap[props.$size]}
	${(props) =>
		props.$variant === 'outline' &&
		css`
			border-color: ${props.$color};
		`};
	${(props) =>
		props.$hovering && { ...variantToHoverStyleMap[props.$variant] }}
`;
