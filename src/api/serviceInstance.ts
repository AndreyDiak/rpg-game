export abstract class ServiceInstance<Entity> {
	abstract getById(id: number): Promise<Entity | null>;
	// TODO подумать как это моно реализовать
	// abstract getWithFilter(): any;

	abstract patch(data: Partial<Entity>): Promise<void>;
}
