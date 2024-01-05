import { memo } from 'react';
import { characterSkillTypeToTitleMap } from '../../../models/character.model';
import {
	CharacterType,
	Skill,
	SkillCategory,
} from '../../../typings/character';
import { CharacterSkillField } from './CharacterSkillField';

const skillCategoryToTitleMap: Record<SkillCategory, string> = {
	active: 'Активный',
	passive: 'Пассивный',
};

export const CharacterSkill = memo(
	({
		skill,
		characterType,
	}: {
		skill: Skill;
		characterType: CharacterType;
	}) => {
		return (
			<div className='w-full'>
				<h2 className='text-2xl text-gray-100 text-center'>Навык</h2>

				{/* skill preview */}
				<div className='my-2'>
					<h3 className='text-gray-200 text-xl text-center'>
						{characterSkillTypeToTitleMap[skill.type]}
					</h3>
					<div className='flex justify-center'>
						<img
							src={skill.imgPath}
							alt=''
							className='rounded-full w-12 h-12'
							style={{
								border: '1px solid var(--color-bg-gold-darken)',
							}}
						/>
					</div>
				</div>

				{/* skill stats */}
				<div className='flex justify-between'>
					<div className='flex flex-col gap-2'>
						<div>
							<h4 className='text-lg text-white'>Тип навыка</h4>
							<h5 className='text-gray-800'>
								{skillCategoryToTitleMap[skill.category]}
							</h5>
						</div>
						<div>
							<h4 className='text-lg text-white'>Описание навыка</h4>
							<h5 className='text-gray-800'>{skill.about}</h5>
						</div>
					</div>
					<div className='flex flex-col items-center'>
						<h4 className='text-lg text-white mb-1'>Клетки действия</h4>
						<CharacterSkillField
							type={
								characterType === CharacterType.SUPPORT
									? 'positive'
									: 'negative'
							}
							cells={[1, -1]}
						/>
					</div>
				</div>
			</div>
		);
	},
);
