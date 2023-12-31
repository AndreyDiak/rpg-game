import { CharacterType } from '../../typings/character';
import longIcon from './../../assets/images/character_type/long.png';
import magicIcon from './../../assets/images/character_type/magic.png';
import meleeIcon from './../../assets/images/character_type/melee.png';
import spyIcon from './../../assets/images/character_type/spy.png';
import supportIcon from './../../assets/images/character_type/support.png';

const characterTypeToImgPathMap: Record<CharacterType, string> = {
	long: longIcon,
	magic: magicIcon,
	melee: meleeIcon,
	support: supportIcon,
	spy: spyIcon,
};

export const CharacterTypeIcon = ({ type }: { type: CharacterType }) => {
	return (
		<img
			src={characterTypeToImgPathMap[type]}
			alt=''
			className='object-cover'
		/>
	);
};
