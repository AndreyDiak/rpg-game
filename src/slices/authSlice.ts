import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AuthUser } from '../typings/auth';

export interface UserState {
	user: AuthUser | null;
}

const initialState: UserState = {
	user: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ user: AuthUser | null }>) => {
			state.user = action.payload.user;
		},
	},
});

export const userSelector = (state: RootState) => state.auth.user;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
