import star2Icon from './../../assets/images/star_2.png';

export const CharacterPresitige = ({ prestige }: { prestige: number }) => {
	return (
		<span className='flex'>
			{Array.from({ length: prestige }).map((_, i) => (
				<img key={i} src={star2Icon} alt='' className='w-5 h-5' />
			))}
		</span>
	);
};
