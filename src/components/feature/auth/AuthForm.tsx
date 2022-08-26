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

const AuthForm: FunctionComponent<AuthFormProps> = (props) => {
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
		<Paper radius="lg" p="lg" className="w-4/12 mx-auto my-20 shadow-lg" withBorder {...props.paperProps}>
			<Text size="lg" weight={500}>
				Welcome to breeze boutique, {type} with
			</Text>
			<Group grow mb="md" mt="md">
				<Button onClick={props.handleGoogleLogin} className="bg-pink hover:bg-violet" radius="xl">
					Google
				</Button>
				<Button className="bg-pink hover:bg-violet" radius="xl">
					Twitter
				</Button>
			</Group>
			<Divider label="Or continue with email" labelPosition="center" my="lg" />
			<form onSubmit={form.onSubmit(handleFormSubmit)}>
				<Stack>
					{type === "register" && (
						<TextInput
							label="Name"
							placeholder="Your name"
							value={form.values.name}
							onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
							classNames={{ wrapper: "w-full", input: "w-full" }}
						/>
					)}
					<TextInput
						required
						label="Email"
						placeholder="sample@example.dev"
						value={form.values.email}
						onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
						error={form.errors.email && "Invalid email"}
					/>
					<PasswordInput
						required
						label="Password"
						placeholder="your secret password"
						value={form.values.password}
						onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
						error={form.errors.password && "Password should include at least 6 characters"}
					/>
					{type === "register" && (
						<Checkbox
							label="I accept terms and conditions"
							checked={form.values.terms}
							onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
						/>
					)}
				</Stack>
				<Group position="apart" mt="xl">
					<Anchor
						className="text-page"
						component="button"
						type="button"
						color="gray"
						onClick={() => toggle()}
						size="xs"
					>
						{type === "register" ? "Already have an account? Login" : "Don't have an account? Register"}
					</Anchor>
					<Button className="w-40 bg-black" type="submit">
						{upperFirst(type)}
					</Button>
				</Group>
			</form>
		</Paper>
	);
};

export default AuthForm;
