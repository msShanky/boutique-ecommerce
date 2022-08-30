import { Button, Image, Text, Title } from "@mantine/core";
import Link from "next/link";
import React, { FunctionComponent } from "react";

type ProductSuccessType = {
	onCancel: () => void;
};

const ProductSuccess: FunctionComponent<ProductSuccessType> = (props) => {
	const { onCancel } = props;

	return (
		<div className="flex flex-col items-center justify-center select-none space-y-8 w-3/5 text-center mx-auto">
			<Image src="/images/success_icon.svg" alt="Cart Success Icon" />
			<Title className="text-4xl font-bold text-page">Product has been updated!</Title>
			<Text className="text-base font-semibold text-violet-subtext">
				Please validate the product details and information related to products
			</Text>
			<Button onClick={onCancel} className="border-none bg-pink text-white hover:bg-violet">
				Back
			</Button>
		</div>
	);
};

export default ProductSuccess;
