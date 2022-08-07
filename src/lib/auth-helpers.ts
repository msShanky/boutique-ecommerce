// import { supabase } from "./supabaseClient";
import { supabaseClient as supabase } from "@supabase/auth-helpers-nextjs";

export async function signInWithGoogle() {
	return await supabase.auth.signIn(
		{
			provider: "google",
		},
		{ redirectTo: "/" }
	);
}

export async function signInWithEmail(formValues: UserSignInType) {
	return await supabase.auth.signIn(formValues);
}

export async function signUpWithEmail(formValues: AuthFormInitialType) {
	const { email, password, ...data } = formValues;
	return await supabase.auth.signUp(
		{ email, password },
		{
			redirectTo: "/",
			data,
		}
	);
}

export async function signOut() {
	return await supabase.auth.signOut();
}
