import { Button, Image, Text, Title } from "@mantine/core";
import Link from "next/link";
import React, { FunctionComponent } from "react";

type ProductSuccessType = {
	onCancel: () => void;
	isAdd: boolean;
};

const ProductSuccess: FunctionComponent<ProductSuccessType> = (props) => {
	const { onCancel, isAdd } = props;

	return (
		<div className="flex flex-col items-center justify-center w-3/5 mx-auto space-y-8 text-center select-none">
			<Image src="/images/success_icon.svg" alt="Cart Success Icon" />
			<Title className="text-4xl font-bold text-page">Product has been {isAdd ? "Added" : "updated"}!</Title>
			<Text className="text-base font-semibold text-violet-subtext">
				Please validate the product details and information related to products
			</Text>
			<Button onClick={onCancel} className="text-white border-none bg-pink hover:bg-violet">
				Back
			</Button>
		</div>
	);
};

export default ProductSuccess;
