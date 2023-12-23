import { errorMessages } from './messages';

export function validateLength(
	value: number,
	options: {
		min?: number;
		max?: number;
	},
): string | undefined {
	const { max, min } = options;
	if (max !== undefined && min !== undefined) {
		if (value >= min && value <= max) {
			return undefined;
		}
		return errorMessages.length.interval(min, max);
	}
	if (max !== undefined) {
		if (value <= max) {
			return undefined;
		}
		return errorMessages.length.max(max);
	}
	if (min !== undefined) {
		if (value >= min) {
			return undefined;
		}
		return errorMessages.length.min(min);
	}
}

export function validateEmail(email: string) {
	const isValid = String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		);

	if (isValid) {
		return undefined;
	}

	return errorMessages.email;
}
