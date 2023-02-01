import { Button, Image, Text, Title } from "@mantine/core";
import Link from "next/link";
import React, { FunctionComponent } from "react";

type ProductSuccessType = {
  onCancel: () => void;
  successText: string;
  validateText: string;
};

const ProductSuccess: FunctionComponent<ProductSuccessType> = (props) => {
  const { onCancel, successText, validateText } = props;

  return (
    <div className="flex flex-col items-center justify-center w-3/5 mx-auto space-y-8 text-center select-none">
      <Image src="/images/success_icon.svg" alt="Cart Success Icon" />
      <Title className="text-4xl font-bold text-primary">{successText}</Title>
      <Text className="text-base font-semibold text-violet-subtext">
        {validateText}
      </Text>
      <Button
        onClick={onCancel}
        className="text-white border-none bg-pink hover:bg-violet"
      >
        Back
      </Button>
    </div>
  );
};

export default ProductSuccess;
