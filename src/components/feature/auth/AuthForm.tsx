import React, { FunctionComponent, MouseEvent, useState } from "react";
import { Anchor, Button, Checkbox, Divider, Group, PaperProps, Stack } from "@mantine/core";
import { Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { signInWithEmail, signUpWithEmail } from "../../../lib/auth-helpers";

type AuthFormProps = {
	paperProps?: PaperProps;
	handleGoogleLogin: (event: MouseEvent) => void;
};

// TODO: [1] The email sign up is not working
// TODO: [1] The errors should be displayed on form validation
export const AuthForm: FunctionComponent<AuthFormProps> = (props) => {
	const [type, toggle] = useToggle<"login" | "register">(["login", "register"]);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const form = useForm<AuthFormInitialType>({
		initialValues: {
			email: "",
			name: "",
			password: "",
			terms: true,
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			password: (val) => {
				return val.length <= 4;
			},
		},
	});

	// TODO: Move this one level up
	const handleFormSubmit = async (formValues: AuthFormInitialType) => {
		const { email, password } = formValues;
		setLoading(true);
		if (type === "login") {
			const { error } = await signInWithEmail({ email, password });
			if (error) {
				setLoading(false);
				setError(error.message);
			}
			return;
		}
		const { error } = await signUpWithEmail(formValues);
		if (error) {
			setLoading(false);
			setError(error.message);
		}
	};

	return (
		<Paper
			radius="lg"
			p="lg"
			className="w-10/12 mx-auto my-20 shadow-lg 2xl:w-4/12 lg:w-6/12"
			withBorder
			{...props.paperProps}
		>
			<Text size="lg" weight={500}>
				Welcome to breeze boutique, {type} with
			</Text>
			<div className="flex justify-center my-6">
				<Button
					onClick={props.handleGoogleLogin}
					className="w-48 text-primaryBlack bg-primary hover:bg-secondary"
					radius="xl"
				>
					Google
				</Button>
			</div>
		</Paper>
	);
};
