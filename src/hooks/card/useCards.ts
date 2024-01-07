import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cardService from '../../api/cardService';
import userService from '../../api/userService';
import { cardsSelector, setCards } from '../../slices/cardSlice';
import { CardConverter } from '../../utils/Converter/CardConverter';
import { isEmpty } from '../../utils/functions/isEmpty';
import { useAuth } from '../useAuth';

/**
 * нужно сделать хранилище с карточкаи, которые мы будем обновлять при:
 * а) мы обновили карточку (повысили уровень или тд) надо сделать запись в бд и перезапросить ее
 * 	1) перезапрашиваем всю коллекцию
 *  2) запрашиваем только id и обновляем только его
 */

export function useCards() {
	const dispatch = useDispatch();

	const rawCards = useSelector(cardsSelector);

	const { user } = useAuth();

	const [loading, setLoading] = useState(false);
	const [cardIDs, setCardIDs] = useState<number[]>([]);

	const loadCardIDs = useCallback(async () => {
		if (!user) {
			return;
		}
		userService.getByID(user.id).then((data) => {
			if (data?.cards_ids) {
				setCardIDs(data?.cards_ids);
			}
		});
	}, [user]);

	const loadCards = useCallback(async () => {
		if (!user) {
			return;
		}
		setLoading(true);
		const cardsIDs = await userService
			.getByID(user.id)
			.then((data) => data?.cards_ids ?? []);
		const cards = await cardService.getByIDs(cardsIDs);
		setLoading(false);
		dispatch(setCards({ cards }));
	}, [dispatch, user]);

	useEffect(() => {
		loadCardIDs();
	}, [loadCardIDs]);

	useEffect(() => {
		// TODO заменить на проверку того, сколько карточке отрендрено, и сколько их есть у игрока

		if (
			!isEmpty(rawCards)
			// Object.keys(rawCards).length === cardIDs.length
		) {
			return;
		}
		loadCards();
	}, [cardIDs, loadCards, rawCards]);

	return useMemo(() => {
		const cards = Object.values(rawCards).map((v) =>
			CardConverter.convertFromApi(v),
		);
		return {
			data: cards,
			loading,
		};
	}, [loading, rawCards]);
}
