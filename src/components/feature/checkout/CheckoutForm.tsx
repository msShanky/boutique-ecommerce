import { Badge, Button, Card, LoadingOverlay, Text, TextInput, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useForm, zodResolver } from "@mantine/form";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React, { FunctionComponent, useEffect, useState } from "react";
import { z } from "zod";

type CheckoutFormProps = {
	handleCheckout: (value: CheckoutFormValue) => void;
	handleCheckoutWithExistingAddress: (value: CheckoutFormValue) => void;
	isLoading: boolean;
	user: User | null;
	userAddressList: any;
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
	city: z.string().min(3, { message: "City value should be greater than 3 characters" }),
	state: z.string().min(3, { message: "State value should be greater than 3 characters" }),
});

const CheckoutForm: FunctionComponent<CheckoutFormProps> = (props) => {
	const { handleCheckout, isLoading, user, userAddressList, handleCheckoutWithExistingAddress } = props;
	const [overrideAddressForm, setOverrideAddressForm] = useState(true);
	const [selectedAddress, setSelectedAddress] = useState<CheckoutFormValue | undefined>();
	const { getInputProps, isValid, onSubmit, errors } = useForm<CheckoutFormValue>({
		validate: zodResolver(schema),
		validateInputOnBlur: true,
		initialValues: {
			phone_number: "",
			first_name: "",
			last_name: "",
			address: "",
			address_line_two: "",
			city: "",
			state: "",
			country: "India",
			pin_code: "",
		},
	});

	// TODO: Handle form errors
	// TODO: Handle login redirect to the same page with state pre-populated

	const handleFormCheckout = (formValues: CheckoutFormValue) => {
		handleCheckout(formValues);
	};

	useEffect(() => {
		if (!userAddressList || !userAddressList.body || userAddressList.body.length <= 0) {
			setOverrideAddressForm(false);
		}
		setOverrideAddressForm(true);
	}, [userAddressList]);

	console.log("The userAddressList", userAddressList && !overrideAddressForm);

	const renderAddressList = () => {
		if (!userAddressList || !userAddressList.body) {
			return <p>No address found</p>;
		}

		const { body } = userAddressList;

		return (
			<>
				<div className="flex items-start justify-between w-full mb-6">
					<Text className="text-sm text-primaryBlack ">Please select an address for delivery</Text>
					<Button
						className="bg-primaryAlt hover:cursor-pointer hover:bg-primaryBlack"
						onClick={() => setOverrideAddressForm(true)}
					>
						Add new
					</Button>
				</div>
				<div className="flex flex-wrap gap-2">
					{body.map((savedAddress: any) => {
						// @ts-ignore
						const isActiveAddress = selectedAddress ? savedAddress.id === selectedAddress.id : false;

						return (
							<Card
								key={`Address-list-${savedAddress.id}`}
								onClick={() => {
									setSelectedAddress(savedAddress);
								}}
								className="relative w-full md:w-5/12 drop-shadow-xl"
							>
								{isActiveAddress && (
									<Badge variant="filled" fullWidth className="absolute w-6 h-6 p-0 right-2 top-2">
										<IconCheck className="w-4 h-4" />
									</Badge>
								)}
								<h4>
									{savedAddress.first_name} {savedAddress.last_name}
								</h4>
								<p>{savedAddress.address}</p>
								{savedAddress.address_line_two && <p>{savedAddress.address_line_two}</p>}
								<p>{savedAddress.city}</p>
								<p>{savedAddress.pin_code}</p>
								<p> {savedAddress.country} </p>
								<p>Phone: {savedAddress.phone_number}</p>
							</Card>
						);
					})}
				</div>
				<Button
					className="mt-6 bg-primaryBlack hover:cursor-pointer hover:bg-primaryAlt"
					onClick={() => (selectedAddress ? handleCheckoutWithExistingAddress(selectedAddress) : null)}
					disabled={!selectedAddress}
				>
					Proceed to payment
				</Button>
			</>
		);
	};

	const renderContactForm = () => {
		return (
			<>
				{/* <div>
					<Text className="mb-10 text-sm text-primaryBlack">*Currently shipping only for Chennai</Text>
				</div> */}
				{/* Contact Information */}
				<div className="flex flex-row justify-between ">
					<Title className="text-lg font-bold text-primaryBlack">Contact Information</Title>
					<div className="space-y-8">
						{!user && (
							<Text className="flex flex-row items-end">
								Already have an account?
								<Link href="/login" passHref>
									<Text className="ml-2 text-lg underline text-primaryBlack hover:cursor-pointer">Log in</Text>
								</Link>
							</Text>
						)}
					</div>
				</div>
				{/* Contact Form */}
				<form className="mt-4 space-y-8" onSubmit={onSubmit(handleFormCheckout)}>
					<TextInput withAsterisk placeholder="894578****" {...getInputProps("phone_number")} />
					<Title className="text-lg font-bold text-primaryBlack">Shipping Address</Title>
					<div className="flex flex-row justify-between gap-8">
						<TextInput className="w-6/12" placeholder="First Name" withAsterisk {...getInputProps("first_name")} />
						<TextInput className="w-6/12" placeholder="Last Name (Optional)" {...getInputProps("last_name")} />
					</div>
					<TextInput withAsterisk placeholder="Address" {...getInputProps("address")} />
					<TextInput placeholder="Apartment, suit, street (Optional)" {...getInputProps("address_line_two")} />
					<TextInput placeholder="City" {...getInputProps("city")} />
					<TextInput placeholder="State" {...getInputProps("state")} />
					<div className="flex flex-row justify-center gap-8">
						<TextInput disabled readOnly className="w-6/12" placeholder="Country" {...getInputProps("country")} />
						<TextInput withAsterisk className="w-6/12" placeholder="Pin Code" {...getInputProps("pin_code")} />
					</div>
					<Button disabled={!isValid} className="text-white bg-primaryBlack hover:bg-primaryBlack/60" type="submit">
						Proceed For Payment
					</Button>
					{userAddressList && userAddressList.data && userAddressList.data.body.length > 0 && (
						<Button
							disabled={!isValid}
							className="text-white md:mx-4 bg-primaryBlack hover:bg-primaryBlack/60"
							onClick={() => setOverrideAddressForm(false)}
							type="reset"
						>
							Select Address
						</Button>
					)}
				</form>
			</>
		);
	};

	return (
		<div className="w-full px-8 py-16 lg:w-8/12 max-h-max bg-primary/60">
			<LoadingOverlay visible={isLoading} overlayBlur={2} />
			{userAddressList && !overrideAddressForm ? renderAddressList() : renderContactForm()}
		</div>
	);
};

export default CheckoutForm;
