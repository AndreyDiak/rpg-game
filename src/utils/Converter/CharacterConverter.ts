import {
	Character,
	CharacterType,
	DBCharacter,
	Rarity,
} from '../../typings/character';

export class CharacterConverter {
	static convertFromApi(data: DBCharacter): Character {
		const { id, img_path, type, rarity, ...rest } = data;
		return {
			id,
			imgPath: img_path,
			type: type as CharacterType,
			rarity: rarity as Rarity,
			...rest,
		};
	}
}
