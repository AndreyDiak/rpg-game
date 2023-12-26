export interface Options<T extends object> {
	select?: (keyof T)[];
}

export abstract class ServiceInstance<Entity> {
	abstract getById<DBEntity extends object>(
		id: number,
		options?: Options<DBEntity>,
	): Promise<Partial<Entity> | null>;
	// TODO подумать как это моно реализовать
	// abstract getWithFilter(): any;

	// abstract patch(data: Partial<Entity>): Promise<void>;

	// abstract getList(): Promise<Entity[] | null>;
}
