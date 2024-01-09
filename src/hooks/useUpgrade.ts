import { useSelector } from 'react-redux';
import { cardByIDSelector } from '../slices/cardSlice';
import { RootState } from '../store';

export function useUpgrade(cardID: number) {
	const card = useSelector((state: RootState) =>
		cardByIDSelector(state, cardID),
	);
	const { level } = card;
	// запрашиваем баланс пользователя
	// насколько улучшаем характеристики?
	// берем текущие значения характеристик
	// берем начальные
	// берем разницу
	// улучшаем на процент от этой разницы???
	const ableToUpdate = false;
	return {
		ableToUpdate,
	};
}
