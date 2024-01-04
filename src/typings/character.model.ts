import { CharacterType, Rarity } from './character';

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
