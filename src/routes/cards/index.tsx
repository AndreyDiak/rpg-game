import { CharacterCard } from '../../components/card/Character';
import { useCards } from '../../hooks/card/useCards';

export const CardsRoute = () => {
	const { data: cards, loading } = useCards();

	if (loading) {
		return 'loading...';
	}

	return (
		<div className='flex w-full h-screen items-center justify-center'>
			<div className='flex gap-4 max-w-4xl'>
				{cards.map((card) => (
					<CharacterCard key={card.id} card={card} />
				))}
			</div>
		</div>
	);
};
