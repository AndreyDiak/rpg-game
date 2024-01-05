import { memo } from 'react';
import { characterTypeToTitleMap } from '../../../models/character.model';
import type { CharacterType as Type } from '../../../typings/character';
import { CharacterTypeIcon } from './CharacterTypeIcon';

export const CharacterType = memo(({ type }: { type: Type }) => {
	return (
		<div className='flex space-x-2 items-center'>
			<span className='text-gray-700'>{characterTypeToTitleMap[type]}</span>
			<CharacterTypeIcon type={type} />
		</div>
	);
});
