import React, { FunctionComponent, MouseEvent } from "react";
import { Anchor, Button, Checkbox, Divider, Group } from "@mantine/core";
import { Paper, PaperProps, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { upperFirst, useForm, useToggle } from "@mantine/hooks";

type AuthFormProps = {
	paperProps?: PaperProps<"div">;
	handleGoogleLogin: (event: MouseEvent) => void;
};

const AuthForm: FunctionComponent<AuthFormProps> = (props) => {
	const [type, toggle] = useToggle("login", ["login", "register"]);
	const form = useForm({
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
			<form onSubmit={form.onSubmit((values) => console.log(values))}>
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
						placeholder="hello@mantine.dev"
						value={form.values.email}
						onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
						error={form.errors.email && "Invalid email"}
					/>

					<PasswordInput
						required
						label="Password"
						placeholder="Your password"
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
					<Anchor component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
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
