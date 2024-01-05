import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import cardService from '../../api/cardService';
import { cardByIDSelector, setCard } from '../../slices/cardSlice';
import { RootState, useAppDispatch } from '../../store';
import { CardConverter } from '../../utils/Converter/CardConverter';
import { isEmpty } from '../../utils/functions/isEmpty';

export function useCard(cardID: number) {
	const dispatch = useAppDispatch();

	const rawCard = useSelector((s: RootState) => cardByIDSelector(s, cardID));

	const [loading, setLoading] = useState(false);

	const loadCard = useCallback(async () => {
		setLoading(true);
		const card = await cardService.getByID(cardID);
		setLoading(false);
		if (!card) {
			return;
		}
		dispatch(setCard({ cardID, card }));
	}, [cardID, dispatch]);

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

	useEffect(() => {
		if (!isEmpty(rawCard)) {
			return;
		}
		loadCard();
	}, [loadCard, rawCard]);

	return useMemo(() => {
		const card = rawCard ? CardConverter.convertFromApi(rawCard) : null;
		return {
			updateCard,
			loading,
			card,
		};
	}, [loading, rawCard, updateCard]);
}
