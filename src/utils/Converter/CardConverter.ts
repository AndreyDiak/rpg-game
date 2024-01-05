import { Card, PCard } from '../../typings/card';
import { CharacterConverter } from './CharacterConverter';

export class CardConverter {
	static convertFromApi(data: PCard): Card {
		const { id, created_at, owner_id, character, ...rest } = data;
		return {
			id,
			createdAt: new Date(created_at ?? ''),
			ownerID: owner_id,
			character: CharacterConverter.convertFromApi(character),
			...rest,
		};
	}
}
