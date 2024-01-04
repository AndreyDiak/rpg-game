import {
	Target,
	Transition,
	Variant,
	VariantLabels,
	Variants,
} from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
/**
 * @param callbackFn
 * function you wanna call with close animation
 * @param duration
 * animation duration in milliseconds
 * @param variants
 * animation variants to initial, open and close conditions
 */
interface Props {
	callbackFn(): void;
	variants: {
		initial: Target | VariantLabels | boolean;
		open: Variant;
		closed?: Variant;
	};
	transition?: Transition;
	duration: number;
}

export function useMotionCallback({
	callbackFn,
	variants,
	duration,
	transition,
}: Props) {
	const { initial, open, closed = initial } = variants;

	const [isOpen, setIsOpen] = useState(true);

	const motionCallbackFn = useCallback(() => {
		setIsOpen(false);
		setTimeout(() => {
			callbackFn();
		}, duration);
	}, [callbackFn, duration]);

	const styles = useMemo(
		() => ({
			animate: (isOpen ? 'open' : 'closed') as VariantLabels,
			variants: {
				open,
				closed,
			} as Variants,
			initial,
			transition: {
				...transition,
				duration: duration / 1000,
			},
		}),
		[closed, duration, initial, isOpen, open, transition],
	);

	return {
		styles,
		motionCallbackFn,
	};
}
