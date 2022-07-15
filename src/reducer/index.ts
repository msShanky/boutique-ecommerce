import cartReducer from "./cart";
import userReducer from "./user";

export const rootReducer = {
	cart: cartReducer,
	user: userReducer,
};
