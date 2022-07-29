import { createDraftSafeSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { definitions } from "../types/supabase";

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
		addProductToCart: (state, { payload }: PayloadAction<ProductCartType>) => {
			console.log("The payload received is ", payload);
			const { product, variant } = payload;
			// const existingIndex = -1;
			const existingIndex = state.products.findIndex((stateProduct) => {
				const isSameProduct = stateProduct.product.id === product.id;
				const isSameVariant = stateProduct.variant.id === variant.id;
				return isSameProduct && isSameVariant;
			});
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

export const { addProductToCart, removeProduct, alterProduct } = actions;

const selectSelf = (state: RootState) => state.cart;

export const cartSafeSelector = createDraftSafeSelector(selectSelf, (state) => {
	let totalValue = 0;
	state.products.forEach((stateValue) => {
		const { product, quantity } = stateValue;
		const mrp = product.msrp as number;
		const discountPrice = mrp * ((product.product_discount as number) / 100);
		const productPrice = mrp - parseInt(discountPrice?.toFixed(), 10);
		const productTotalPrice = quantity * productPrice;
		totalValue = productTotalPrice + totalValue;
	});
	return totalValue;
});

export default reducer;
