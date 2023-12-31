import { CharacterCard } from '../../components/card/Character';
import { useCards } from '../../hooks/card/useCards';

export const CardsRoute = () => {
	const { data: cards, loading } = useCards();

	if (loading) {
		return 'loading...';
	}

	return (
		<div>
			<div>
				{cards.map((card) => (
					<CharacterCard key={card.id} card={card} />
				))}
			</div>
		</div>
	);
};
