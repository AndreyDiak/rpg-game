import { Outlet } from 'react-router-dom';
import { CharacterCard } from '../../components/card/character/Character';
import { useCards } from '../../hooks/card/useCards';

export const CardsRoute = () => {
	const { data: cards, loading } = useCards();

	if (loading) {
		return <span>Загрузка...</span>;
	}

	return (
		<div className='flex w-full h-screen items-center'>
			<div className='w-full flex justify-center flex-1'>
				<div className='flex gap-4 max-w-4xl'>
					{cards.map((card) => (
						<CharacterCard key={card.id} card={card} />
					))}
				</div>
			</div>
			<Outlet />
		</div>
	);
};
