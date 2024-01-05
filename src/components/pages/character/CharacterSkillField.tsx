import { memo } from 'react';
import { IoMdPerson } from 'react-icons/io';

const CENTER_CELL_INDEX = 4;

const CELLS = Array(9).fill(null);

interface Props {
	type: 'positive' | 'negative';
	cells: number[];
}

const typeToHiglitedColorMap: Record<Props['type'], string> = {
	positive: '#97c47d',
	negative: '#eb9386',
};

export const CharacterSkillField = memo(({ type, cells }: Props) => {
	const higlitedCells = new Set(cells.map((v) => CENTER_CELL_INDEX + v));

	return (
		<div className='flex flex-wrap w-32 h-32 gap-1'>
			{CELLS.map((_, index) => {
				const isHigleted = higlitedCells.has(index);
				const backgroundColor = isHigleted
					? typeToHiglitedColorMap[type]
					: 'var(--color-bg-gold-lighten)';

				return (
					<div
						key={index}
						className='w-10 h-10 flex justify-center items-center'
						style={{
							backgroundColor,
							border: '0.5px solid var(--color-bg-gold-darken)',
							borderTopLeftRadius: index === 0 ? 8 : 0,
							borderTopRightRadius: index === 2 ? 8 : 0,
							borderBottomLeftRadius: index === 6 ? 8 : 0,
							borderBottomRightRadius: index === 8 ? 8 : 0,
						}}
					>
						{index === CENTER_CELL_INDEX ? (
							<IoMdPerson
								size={28}
								color={'var(--color-bg-gold-darken)'}
							/>
						) : null}
					</div>
				);
			})}
		</div>
	);
});
