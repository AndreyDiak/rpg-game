export type Generate<
	T extends number,
	ACC extends unknown[] = [],
	R extends number = T,
> = ACC['length'] extends T ? R : Generate<T, [...ACC, 0], R | ACC['length']>;

export type PickSelected<
	T extends object,
	U extends readonly (keyof T)[] | undefined,
> = U extends undefined ? T : U extends unknown[] ? Pick<T, U[number]> : T;
