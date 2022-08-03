import React, { FunctionComponent, MouseEvent } from "react";
import { Anchor, Button, Checkbox, Divider, Group } from "@mantine/core";
import { Paper, PaperProps, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { upperFirst, useForm, useToggle } from "@mantine/hooks";
import { signInWithEmail, signUpWithEmail } from "../../../utils/auth";

type AuthFormProps = {
	paperProps?: PaperProps<"div">;
	handleGoogleLogin: (event: MouseEvent) => void;
};

const AuthForm: FunctionComponent<AuthFormProps> = (props) => {
	const [type, toggle] = useToggle<"login" | "register">("login", ["login", "register"]);
	const form = useForm<AuthFormInitialType>({
		initialValues: {
			email: "",
			name: "",
			password: "",
			terms: true,
		},

		validationRules: {
			email: (val) => /^\S+@\S+$/.test(val),
			password: (val) => val.length >= 6,
		},
	});

	const handleFormSubmit = async (formValues: AuthFormInitialType) => {
		const { email, password } = formValues;
		if (type === "login") {
			const { user, error } = await signInWithEmail({ email, password });
			console.log(user, "User logged in successfully");
			console.log(error, "User log in failed");
			return;
		}
		const { user, error } = await signUpWithEmail(formValues);
		console.log(user, "User registered in successfully");
		console.log(error, "User registration failed");
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
				<Group direction="column" grow>
					{type === "register" && (
						<TextInput
							label="Name"
							placeholder="Your name"
							value={form.values.name}
							onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
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
				</Group>
				<Group position="apart" mt="xl">
					<Anchor className="text-page" component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
						{type === "register" ? "Already have an account? Login" : "Don't have an account? Register"}
					</Anchor>
					<Button className="bg-black" type="submit">
						{upperFirst(type)}
					</Button>
				</Group>
			</form>
		</Paper>
	);
};

export default AuthForm;
