export interface Options<T> {
	select?: (keyof T)[];
}

export abstract class Service<DBEntity extends object> {
	abstract getByID(id: number): Promise<DBEntity | null>;

	abstract getByIDs(ids: number[]): Promise<DBEntity[]>;
}
