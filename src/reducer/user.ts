import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { RootState } from "../app/store";

const initialState: UserStateType = {
	user: undefined,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUserSession: (state, { payload }: PayloadAction<Session>) => {
			state.user = payload;
		},
	},
});

const { actions, reducer } = userSlice;

export const { updateUserSession } = actions;

export default reducer;
