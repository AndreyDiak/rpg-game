import { Card, DBCard } from '../../typings/card';
import { Update } from '../../typings/utils';

export class CardPatcher {
	static convertToApiFromUpdate(data: Update<Card>): Partial<DBCard> {
		const { count, level, prestige } = data;
		return {
			count,
			level,
			prestige,
		};
	}
}
