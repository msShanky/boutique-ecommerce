// import { supabase } from "./supabaseClient";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export async function signInWithGoogle() {
	return await supabaseClient.auth.signIn(
		{
			provider: "google",
		},
		{ redirectTo: "/api/auth/user" }
	);
}

export async function signInWithEmail(formValues: UserSignInType) {
	return await supabaseClient.auth.signIn(formValues);
}

export async function signUpWithEmail(formValues: AuthFormInitialType) {
	const { email, password, ...data } = formValues;
	return await supabaseClient.auth.signUp(
		{ email, password },
		{
			redirectTo: "/",
			data,
		}
	);
}

export async function signOut() {
	return await supabaseClient.auth.signOut();
}
