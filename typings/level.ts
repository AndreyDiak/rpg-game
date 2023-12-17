import { BoardIndex } from './board';

interface LevelEnemy {
	id: number;
	level: number;
	index: BoardIndex;
}

export interface Level {
	title: string;
	balance: number;
	enemies: LevelEnemy[];
}
