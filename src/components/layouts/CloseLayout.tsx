import { HTMLAttributes } from 'react';
import { CloseIcon } from '../common/icon/CloseIcon';

interface Props extends HTMLAttributes<HTMLDivElement> {
	onClose(): void;
	closeX?: 'left' | 'right';
	closeY?: 'top' | 'bottom';
}

export const CloseLayout = ({
	children,
	onClose,
	closeX = 'right',
	closeY = 'top',
	...rest
}: Props) => {
	return (
		<div {...rest}>
			<CloseIcon
				size='xl'
				onClick={onClose}
				style={{
					[closeX]: 16,
					[closeY]: 16,
					position: 'absolute',
				}}
			/>
			{children}
		</div>
	);
};
