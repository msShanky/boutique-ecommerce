import React, { FunctionComponent } from "react";
import { Button, Image, Text, Title } from "@mantine/core";
import { useLottie } from "lottie-react";

import successAnimation from "animations/1708-success.json";

type ProductSuccessType = {
	onCancel: () => void;
	successText: string;
	validateText: string;
};

const successAnimationProps = {
	animationData: successAnimation,
	loop: true,
	style: {
		width: "350px",
	},
};

const ProductSuccess: FunctionComponent<ProductSuccessType> = (props) => {
	const { onCancel, successText, validateText } = props;
	const { View } = useLottie(successAnimationProps);

	return (
		<div className="flex flex-col items-center justify-center w-3/5 mx-auto space-y-8 text-center select-none">
			<div>{View}</div>
			<Title className="text-4xl font-bold text-primary">{successText}</Title>
			<Text className="text-base font-semibold text-violet-subtext">{validateText}</Text>
			<Button onClick={onCancel} className="text-white border-none bg-primary hover:bg-primaryBlack">
				Back
			</Button>
		</div>
	);
};

export default ProductSuccess;
