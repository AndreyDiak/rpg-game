export const errorMessages = {
	email: 'Эл. почта не соответсвует формату.',
	length: {
		min(v: number) {
			return `Длина не менее ${v} символов.`;
		},
		max(v: number) {
			return `Длина не более ${v} символов.`;
		},
		interval(min: number, max: number) {
			return `Длина от ${min} до ${max} символов.`;
		},
	},
};
