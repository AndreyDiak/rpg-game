import { HTMLAttributes, memo } from 'react';

import { classNames } from '../../../utils/functions/classNames';
import closeIconPath from './../../../assets/images/close.png';

type IconSize = 'sm' | 'md' | 'lg' | 'xl';

interface Props extends HTMLAttributes<HTMLSpanElement> {
	size?: IconSize;
}

const sizeMap: Record<IconSize, number> = {
	sm: 20,
	md: 24,
	lg: 28,
	xl: 32,
};

export const CloseIcon = memo(({ size = 'md', className, ...rest }: Props) => {
	return (
		<span {...rest} className={classNames(className, 'cursor-pointer')}>
			<img
				src={closeIconPath}
				alt=''
				style={{
					width: sizeMap[size],
				}}
			/>
		</span>
	);
});
