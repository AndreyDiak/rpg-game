import { memo } from 'react';
import { Rarity } from '../../../typings/character';
import { characterRarityToTitleMap } from '../../../typings/character.model';

const rarityToColorMap: Record<Rarity, string> = {
	common: '#374151',
	rare: '#619ed4',
	epic: '#77368b',
	legendary: '#da5343',
};

interface Props {
	colored: boolean;
	rarity: Rarity;
}

export const CharacterRarity = memo(({ colored, rarity }: Props) => {
	const color = colored ? rarityToColorMap[rarity] : rarityToColorMap.common;

	return <h6 style={{ color }}>{characterRarityToTitleMap[rarity]}</h6>;
});
