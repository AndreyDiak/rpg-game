export function mapValues<T, O>(
	values: Readonly<Record<string, T>>,
	transformer: (value: T) => O,
) {
	const result: Record<string, O> = {};
	const entries = Object.entries(values);

	for (const [key, value] of entries) {
		result[key] = transformer(value);
	}
	return result;
}
