import {
	Character,
	CharacterType,
	DBCharacter,
	DBSkill,
	Rarity,
	Skill,
} from '../../typings/character';

export class CharacterConverter {
	static convertFromApi(data: DBCharacter): Character {
		const {
			id,
			img_path_with_bg,
			img_path_without_bg,
			type,
			rarity,
			skill,
			...rest
		} = data;
		return {
			id,
			imgPathWithBg: img_path_with_bg,
			imgPathWithoutBg: img_path_without_bg,
			type: type as CharacterType,
			rarity: rarity as Rarity,
			skill: this.convertSkillFromApi(skill),
			...rest,
		};
	}

	private static convertSkillFromApi(skill: DBSkill | null): Skill | null {
		if (!skill) {
			return null;
		}

		const { img_path, ...rest } = skill;
		return {
			imgPath: img_path,
			...rest,
		};
	}
}
