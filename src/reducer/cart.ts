import { createDraftSafeSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type CartInitState = {
	products: Array<CartProduct>;
};

const initialState: CartInitState = {
	products: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addProduct: (state, { payload }: PayloadAction<SelectedProduct>) => {
			console.log("The payload received is ", payload);
			const existingIndex = state.products.findIndex(
				(p) => p.id === payload.id && p.selectedSize === payload.selectedSize
			);
			console.log("The existing index is", existingIndex);
			// If the product already exists then increase the quantity by 1
			if (existingIndex >= 0) {
				state.products[existingIndex].quantity = state.products[existingIndex].quantity + 1;
				return;
			}

			state.products.push({ ...payload, quantity: 1 });
		},
		removeProduct: () => {},
		alterProduct: () => {},
	},
});

const { actions, reducer } = cartSlice;

export const { addProduct, removeProduct, alterProduct } = actions;

const selectSelf = (state: RootState) => state.cart;

export const cartSafeSelector = createDraftSafeSelector(selectSelf, (state) => {
	let totalValue = 0;
	state.products.forEach((product) => {
		const productTotalPrice = product.quantity * product.price;
		totalValue = productTotalPrice + totalValue;
	});
	return totalValue;
});

export default reducer;
