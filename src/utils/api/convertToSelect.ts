export function convertToSelect<T extends object>(
	select: (keyof T)[] | undefined,
): string {
	if (!select || select.length === 0) {
		return '*';
	}

	return select.join(', ');
}
