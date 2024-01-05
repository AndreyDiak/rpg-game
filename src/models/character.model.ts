import { CharacterType, Rarity, SkillType } from '../typings/character';

export const characterTypeToTitleMap: Record<CharacterType, string> = {
	support: 'Поддержка',
	melee: 'Ближний бой',
	long: 'Дальний бой',
	magic: 'Маг',
	spy: 'Шпион',
};

export const characterRarityToTitleMap: Record<Rarity, string> = {
	common: 'Обычная',
	rare: 'Редкая',
	epic: 'Эпическая',
	legendary: 'Легендарная',
};

export const characterSkillTypeToTitleMap: Record<SkillType, string> = {
	hp_damage: 'Нанесение урона',
	taken_damage_increase: 'Увеличение получаемоего урона',
	damage_reduction: 'Уменьшение урона',

	damage_increase: 'Увеличение урона',
	hp_recovery: 'Прибавление здоровья',
	protection_increase: 'Увеличение защиты',
};
