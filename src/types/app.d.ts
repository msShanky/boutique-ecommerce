type Product = {
	id: number;
	image: string;
	price: number;
	size: Array<string>;
};

type SelectedProduct = Product & {
	selectedSize: string;
};

type CartProduct = SelectedProduct & {
	quantity: number;
};
