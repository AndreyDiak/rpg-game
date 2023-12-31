import {
	Character,
	CharacterType,
	DBCharacter,
	Rarity,
} from '../../typings/character';

export class CharacterConverter {
	static convertFromApi(data: DBCharacter): Character {
		const {
			id,
			img_path_with_bg,
			img_path_without_bg,
			type,
			rarity,
			...rest
		} = data;
		return {
			id,
			imgPathWithBg: img_path_with_bg,
			imgPathWithoutBg: img_path_without_bg,
			type: type as CharacterType,
			rarity: rarity as Rarity,
			...rest,
		};
	}
}
