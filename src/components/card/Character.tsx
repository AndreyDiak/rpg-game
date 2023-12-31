import { memo } from 'react';
import { Card } from '../../typings/card';
import { Rarity } from '../../typings/character';
import { CharacterPresitige } from './CharacterPresitige';
import { CharacterTypeIcon } from './CharacterTypeIcon';

interface Props {
	card: Card;
}

const rarityToBorderColorMap: Record<Rarity, string> = {
	common: '#557cb3',
	rare: '#c96f4b',
	epic: '#c56dc3',
	legendary: '#edefef',
};

export const CharacterCard = memo(({ card }: Props) => {
	const {
		character: { type, rarity, imgPathWithBg },
		level,
		prestige,
	} = card;

	const borderColor = rarityToBorderColorMap[rarity];

	return (
		<div
			className='max-w-36 relative rounded-md cursor-pointer'
			style={{
				border: `3px solid ${borderColor}`,
				backgroundColor: 'var(--color-bg-gold-darken)',
			}}
		>
			<div className='relative'>
				<img src={imgPathWithBg} className='w-36 h-36 object-cover' />
				<span className='absolute bottom-1 left-1'>
					<CharacterPresitige prestige={prestige} />
				</span>
			</div>

			<div className='flex justify-between items-center'>
				<div className='text-gray-200 font-normal ml-2'>
					LVL{' '}
					<span className='text-orange-500 font-semibold font-sans'>
						{level}
					</span>
				</div>
				<span
					style={{
						backgroundColor: borderColor,
						borderTopLeftRadius: 10,
					}}
				>
					<CharacterTypeIcon type={type} />
				</span>
			</div>
		</div>
	);
});
