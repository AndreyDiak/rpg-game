export interface Character {
	name: string;
	type: CharacterType;
	rarity: Rarity;
	characteristics: {
		damage: number;
		hp: number;
		armor: number;
	};
	skill?: {
		type: SkillType;
		category: SkillCategory;
		count: number;
		imgPath: string;
		about: string;
	};
	imgPath: string;
	about: string;
}
/**
 *  ???  melee -> long -> magic -> melee
 */
export enum CharacterType {
	MELEE = 'melee',
	SUPPORT = 'support',
	MAGIC = 'magic',
	LONG = 'long',
	SPY = 'spy',
}

export enum Rarity {
	COMMON = 'common',
	RARE = 'rare',
	EPIC = 'epic',
	LEGENDARY = 'legendary',
}

export enum SkillType {
	// положительные (у саппортов) применяются к своим юнитам
	DAMAGE_INCREASE = 'damage_increase',
	PROTECTION_INCREASE = 'protection_increase',
	HP_RECOVERY = 'hp_recovery',
	// отрицательные (у шпионов) применяются к юнитам противника
	HP_DAMAGE = 'hp_damage',
	TAKEN_DAMAGE_INCREASE = 'taken_damage_increase',
	DAMAGE_REDUCTION = 'damage_reduction',
}

export type SkillCategory = 'active' | 'passive';
