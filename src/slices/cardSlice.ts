import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { PCard } from '../typings/card';
import { groupBy } from '../utils/functions/groupBy';
import { mapValues } from '../utils/functions/mapValues';

export interface CardState {
	cards: Record<string, PCard>;
}

const initialState: CardState = {
	cards: {},
};

export const cardSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {
		setCards: (state, action: PayloadAction<{ cards: PCard[] }>) => {
			state.cards = mapValues(
				groupBy(action.payload.cards, (v) => v.id),
				(v) => v[0],
			);
		},
		setCard: (
			state,
			action: PayloadAction<{ cardID: number; card: PCard }>,
		) => {
			const { card, cardID } = action.payload;
			state.cards[cardID] = card;
		},
	},
});

export const cardsSelector = (state: RootState) => state.card.cards;

export const { setCards, setCard } = cardSlice.actions;

export default cardSlice.reducer;
