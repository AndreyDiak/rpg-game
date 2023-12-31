import { memo } from 'react';
import { Card } from '../../typings/card';

interface Props {
	card: Card;
}

export const CharacterCard = memo(({ card }: Props) => {
	return (
		<div>
			<div>{card.character.name}</div>
			<img src={card.character.imgPath} className='' />
		</div>
	);
});
