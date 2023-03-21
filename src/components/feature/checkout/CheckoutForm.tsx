import { Button, LoadingOverlay, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import { z } from "zod";

type CheckoutFormProps = {
	handleCheckout: (value: CheckoutFormValue) => void;
	isLoading: boolean;
	user: User | null;
};

const schema = z.object({
	phone_number: z
		.string()
		.min(10, { message: "Phone number should be 10 digits" })
		.max(10, { message: "Phone number should be 10 digits" }),
	first_name: z
		.string()
		.min(2, { message: "First name should be greater than 2 characters" })
		.max(50, { message: "First name should be less than 50 characters" }),
	address: z
		.string()
		.min(10, { message: "Address should be greater than 10 characters" })
		.max(250, { message: "Address should be less than 250 characters" }),
	pin_code: z
		.string()
		.min(6, { message: "Pin code should be 6 digits" })
		.max(6, { message: "Pin code should be 6 digits" }),
});

const CheckoutForm: FunctionComponent<CheckoutFormProps> = (props) => {
	const { handleCheckout, isLoading, user } = props;
	const { getInputProps, isValid, onSubmit, errors } = useForm<CheckoutFormValue>({
		validate: zodResolver(schema),
		validateInputOnBlur: true,
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

	const handleFormCheckout = (formValues: CheckoutFormValue) => {
		handleCheckout(formValues);
	};

	return (
		<div className="w-7/12 px-8 py-16 max-h-max bg-violet-light">
			<LoadingOverlay visible={isLoading} overlayBlur={2} />
			<div>
				<Text className="mb-10 text-sm text-primary">*Currently shipping only for Chennai</Text>
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
				</div>
			</div>
			<form className="mt-4 space-y-8" onSubmit={onSubmit(handleFormCheckout)}>
				<TextInput withAsterisk placeholder="894578****" {...getInputProps("phone_number")} />
				<Title className="text-lg font-bold text-highlight-dark-blue">Shipping Address</Title>
				<div className="flex flex-row justify-between gap-8">
					<TextInput className="w-6/12" placeholder="First Name" withAsterisk {...getInputProps("first_name")} />
					<TextInput className="w-6/12" placeholder="Last Name (Optional)" {...getInputProps("last_name")} />
				</div>
				<TextInput withAsterisk placeholder="Address" {...getInputProps("address")} />
				<TextInput placeholder="Apartment, suit, street (Optional)" {...getInputProps("address_line_two")} />
				<TextInput disabled readOnly placeholder="City" {...getInputProps("city")} />
				<div className="flex flex-row justify-center gap-8">
					<TextInput disabled readOnly className="w-6/12" placeholder="Country" {...getInputProps("country")} />
					<TextInput withAsterisk className="w-6/12" placeholder="Pin Code" {...getInputProps("pin_code")} />
				</div>
				<Button disabled={!isValid} className="bg-pink hover:bg-violet" type="submit">
					Proceed For Payment
				</Button>
			</form>
		</div>
	);
};

export default CheckoutForm;
