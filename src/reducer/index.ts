import { breezeBaseApi } from "./breezeBaseApi";
import cartReducer from "./cart";
import userReducer from "./user";

export const rootReducer = {
	cart: cartReducer,
	user: userReducer,
	[breezeBaseApi.reducerPath]: breezeBaseApi.reducer,
};
