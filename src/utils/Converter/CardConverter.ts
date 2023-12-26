import { Card, DBCard } from '../../typings/card';

const DEFAULT_LEVEL = 1;
const DEFAULT_COUNT = 1;
const DEFAULT_PRESTIGE = 0;

export class CardConverter {
	static convertFromApi(data: Partial<DBCard> | null): Partial<Card> | null {
		if (!data) {
			return null;
		}
		const { character_id, created_at, id, level, prestige, count } = data;
		return {
			id,
			level: level || level === null ? DEFAULT_LEVEL : undefined,
			prestige: prestige || prestige === null ? DEFAULT_PRESTIGE : undefined,
			count: count ?? DEFAULT_COUNT,
			characterId: character_id!,
			createdAt: new Date(created_at ?? ''),
		};
	}
}
