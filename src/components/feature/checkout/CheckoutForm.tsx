import { Button, LoadingOverlay, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React, { FunctionComponent } from "react";

type CheckoutFormProps = {
	handleCheckout: (value: CheckoutFormValue) => void;
	isLoading: boolean;
	user: User | null;
};

const CheckoutForm: FunctionComponent<CheckoutFormProps> = (props) => {
	const { handleCheckout, isLoading, user } = props;
	const userCheckoutForm = useForm<CheckoutFormValue>({
		initialValues: {
			phone_number: "",
			first_name: "",
			last_name: "",
			address: "",
			address_line_two: "",
			city: "Chennai",
			country: "India",
			pin_code: "",
		},
	});

	// TODO: Handle form errors
	// TODO: Handle login redirect to the same page with state pre-populated

	return (
		<div className="w-7/12 px-8 py-16 max-h-max bg-violet-light">
			<LoadingOverlay visible={isLoading} overlayBlur={2} />
			<div>
				<Text className="text-sm text-page mb-10">*Currently shipping only for Chennai</Text>
			</div>
			{/* Contact Information */}
			<div className="flex flex-row justify-between ">
				<Title className="text-lg font-bold text-highlight-dark-blue">Contact Information</Title>
				<div className="space-y-8">
					{!user && (
						<Text className="flex flex-row items-end">
							Already have an account?
							<Link href="/login" passHref>
								<Text className="ml-2 text-lg underline text-violet hover:cursor-pointer">Log in</Text>
							</Link>
						</Text>
					)}
					{user && <div>User Logged In</div>}
				</div>
			</div>
			<form className="mt-4 space-y-8" onSubmit={userCheckoutForm.onSubmit(handleCheckout)}>
				<TextInput required placeholder="894578****" {...userCheckoutForm.getInputProps("phone_number")} />
				<Title className="text-lg font-bold text-highlight-dark-blue">Shipping Address</Title>
				<div className="flex flex-row justify-between gap-8">
					<TextInput
						className="w-6/12"
						placeholder="First Name"
						required
						{...userCheckoutForm.getInputProps("first_name")}
					/>
					<TextInput
						className="w-6/12"
						placeholder="Last Name (Optional)"
						{...userCheckoutForm.getInputProps("last_name")}
					/>
				</div>
				<TextInput placeholder="Address" {...userCheckoutForm.getInputProps("address")} />
				<TextInput
					placeholder="Apartment, suit, street (Optional)"
					{...userCheckoutForm.getInputProps("address_line_two")}
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
					<TextInput className="w-6/12" placeholder="Pin Code" {...userCheckoutForm.getInputProps("pin_code")} />
				</div>
				<Button className="bg-pink hover:bg-violet" type="submit">
					Proceed For Payment
				</Button>
			</form>
		</div>
	);
};

export default CheckoutForm;
