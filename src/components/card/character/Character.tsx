import { memo } from 'react';
import { Card } from '../../../typings/card';
import { Rarity } from '../../../typings/character';
import { CharacterPresitige } from './CharacterPresitige';
import { CharacterTypeIcon } from './CharacterTypeIcon';

import { Link } from 'react-router-dom';
import commonCard from './../../../assets/images/character_rarity/common.png';
import epicCard from './../../../assets/images/character_rarity/epic.png';
import legendaryCard from './../../../assets/images/character_rarity/legendary.png';
import rareCard from './../../../assets/images/character_rarity/rare.png';

interface Props {
	card: Card;
}

const rarityToBorderColorMap: Record<Rarity, string> = {
	common: commonCard,
	rare: rareCard,
	epic: epicCard,
	legendary: legendaryCard,
};

export const CharacterCard = memo(({ card }: Props) => {
	const {
		character: { type, rarity, imgPathWithBg },
		level,
		prestige,
		id,
	} = card;

	return (
		<Link to={`/cards/${id}`}>
			<div className='relative rounded-md cursor-pointer w-40 h-60 hover:scale-105 duration-300'>
				<img
					src={rarityToBorderColorMap[rarity]}
					className='z-10 absolute'
				/>
				<div className='absolute top-2 left-4 w-32 flex flex-col space-y-1'>
					<img src={imgPathWithBg} className='object-cover' />
					<span className='z-20 flex ml-2'>
						<CharacterPresitige prestige={prestige} />
					</span>
					<div className='flex items-center justify-between px-1'>
						<div className='font-normal ml-2 z-20'>
							<div>Уровень</div>
							<span className='font-bold text-orange-600'>{level}</span>
						</div>
						<span className='z-20'>
							<CharacterTypeIcon type={type} />
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
});
