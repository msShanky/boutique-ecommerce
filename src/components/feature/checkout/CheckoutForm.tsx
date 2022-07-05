import { Button, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import React from "react";

const CheckoutForm = () => {
	const userCheckoutForm = useForm({
		initialValues: {
			phone: "",
			firstName: "",
			lastName: "",
			address: "",
			addressLineTwo: "",
			city: "Chennai",
			country: "India",
			pinCode: "",
		},
	});

	return (
		<div className="w-8/12 px-8 py-16 max-h-max bg-violet-light">
			{/* Contact Information */}
			<div className="flex flex-row justify-between ">
				<Title className="text-lg font-bold text-highlight-dark-blue">Contact Information</Title>
				<div className="space-y-8">
					<Text className="flex flex-row items-end">
						Already have an account?
						<Link href="/login" passHref>
							<Text className="ml-2 text-lg underline text-violet hover:cursor-pointer">Log in</Text>
						</Link>
					</Text>
				</div>
			</div>
			<form className="mt-4 space-y-8" onSubmit={userCheckoutForm.onSubmit((values) => console.log(values))}>
				<TextInput required placeholder="894578****" {...userCheckoutForm.getInputProps("phone")} />
				<Title className="text-lg font-bold text-highlight-dark-blue">Shipping Address</Title>
				<div className="flex flex-row justify-between gap-8">
					<TextInput
						className="w-6/12"
						placeholder="First Name"
						required
						{...userCheckoutForm.getInputProps("firstName")}
					/>
					<TextInput
						className="w-6/12"
						placeholder="Last Name (Optional)"
						{...userCheckoutForm.getInputProps("lastName")}
					/>
				</div>
				<TextInput placeholder="Address" {...userCheckoutForm.getInputProps("address")} />
				<TextInput
					placeholder="Apartment, suit, street (Optional)"
					{...userCheckoutForm.getInputProps("addressLineTwo")}
				/>
				<TextInput disabled readOnly placeholder="City" {...userCheckoutForm.getInputProps("city")} />
				<div className="flex flex-row justify-center gap-8">
					<TextInput
						disabled
						readOnly
						className="w-6/12"
						placeholder="Country"
						{...userCheckoutForm.getInputProps("country")}
					/>
					<TextInput className="w-6/12" placeholder="Pin Code" {...userCheckoutForm.getInputProps("pinCode")} />
				</div>
				<Button className="bg-pink hover:bg-violet" type="submit">
					Proceed For Payment
				</Button>
			</form>
		</div>
	);
};

export default CheckoutForm;
