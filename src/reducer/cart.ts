import { createDraftSafeSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { definitions } from "../types/supabase";

type CartInitState = {
	products: Array<CartProduct>;
};

const initialState: CartInitState = {
	products: [],
};

const getProductIndexFromCart = (products: Array<CartProduct>, payload: ProductCartType): number => {
	const { product, variant } = payload;
	const productIndex = products.findIndex((stateProduct) => {
		const isSameProduct = stateProduct.product.id === product.id;
		const isSameVariant = stateProduct.variant.id === variant.id;
		return isSameProduct && isSameVariant;
	});
	return productIndex;
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addProductToCart: (state, { payload }: PayloadAction<ProductCartType>) => {
			const existingIndex = getProductIndexFromCart(state.products, payload);
			// If the product already exists then increase the quantity by 1
			if (existingIndex >= 0) {
				state.products[existingIndex].quantity = state.products[existingIndex].quantity + 1;
				return;
			}
			state.products.push({ ...payload, quantity: 1 });
		},
		increaseQuantity: (state, { payload }: PayloadAction<ProductCartType>) => {
			const existingIndex = getProductIndexFromCart(state.products, payload);
			if (existingIndex >= 0) {
				state.products[existingIndex].quantity = state.products[existingIndex].quantity + 1;
				return;
			}
		},
		decreaseQuantity: (state, { payload }: PayloadAction<ProductCartType>) => {
			const existingIndex = getProductIndexFromCart(state.products, payload);
			const currentQuantity = state.products[existingIndex].quantity;
			if (existingIndex >= 0 && currentQuantity > 1) {
				state.products[existingIndex].quantity = state.products[existingIndex].quantity - 1;
				return;
			} else {
				// TODO: Handle cart warning if the quantity is less than 0
				console.log("Throw a warning if it's less than 0");
			}
		},
		clearCart: (state) => {
			state = initialState;
			return state;
		},
	},
});

const { actions, reducer } = cartSlice;

export const { addProductToCart, clearCart, increaseQuantity, decreaseQuantity } = actions;

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
