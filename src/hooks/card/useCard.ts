import { useCallback } from 'react';
import { toast } from 'react-toastify';
import cardService from '../../api/cardService';
import { setCard } from '../../slices/cardSlice';
import { useAppDispatch } from '../../store';

export function useCard() {
	const dispatch = useAppDispatch();

	const updateCard = useCallback(
		async (cardID: number) => {
			cardService.getByID(cardID).then((card) => {
				if (!card) {
					toast.warning('Произошла ошибка');
					return;
				}
				dispatch(setCard({ cardID, card }));
			});
		},
		[dispatch],
	);

	return {
		updateCard,
	};
}
