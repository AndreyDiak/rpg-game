import { Database } from '../supabase/types';

export type Characteristics = {
	damage: number;
	hp: number;
	armor: number;
};

export type DBSkill = {
	type: SkillType;
	category: SkillCategory;
	count: number;
	img_path: string;
	about: string;
};

export type Skill = Omit<DBSkill, 'img_path'> & { imgPath: string };

export type DBCharacter = Omit<
	Database['public']['Tables']['characters']['Row'],
	'characteristics' | 'skill'
> & {
	characteristics: Characteristics;
	skill: DBSkill | null;
};

export interface Character {
	id: number;
	name: string;
	type: CharacterType;
	rarity: Rarity;
	characteristics: Characteristics;
	skill: Skill | null;
	imgPathWithBg: string;
	imgPathWithoutBg: string;
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
