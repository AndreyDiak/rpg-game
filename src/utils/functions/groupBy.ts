export function groupBy<T extends Readonly<object>>(
	list: T[],
	keyGenerator: (item: T) => string | number,
) {
	const map: Record<string, T[]> = {};

	list.forEach((item) => {
		const key = keyGenerator(item);
		(map[key] = map[key] ?? []).push(item);
	});

	return map;
}
