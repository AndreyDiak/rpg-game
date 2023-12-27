import { ConstructSelectedType } from './cardService';

export interface Options<T> {
	select?: (keyof T)[];
}

export abstract class Service<Entity extends object, DBEntity extends object> {
	abstract getById<T extends Options<DBEntity>>(
		id: number,
		options?: T,
	): Promise<ConstructSelectedType<DBEntity, T['select']> | null>;

	// abstract patch(data: Partial<Entity>): Promise<void>;

	// abstract getList(): Promise<Entity[] | null>;
}
