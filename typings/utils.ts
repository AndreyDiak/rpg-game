export type Generate<
	T extends number,
	ACC extends unknown[] = [],
	R extends number = T,
> = ACC['length'] extends T ? R : Generate<T, [...ACC, 0], R | ACC['length']>;
