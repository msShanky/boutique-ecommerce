import { supabase } from "./supabaseClient";

export async function signInWithGoogle() {
	return await supabase.auth.signIn(
		{
			provider: "google",
		},
		{
			redirectTo: "/",
		}
	);
}

export async function signInWithEmail(formValues: UserSignInType) {
	return await supabase.auth.signIn({
		...formValues,
	});
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
	const { error } = await supabase.auth.signOut();
}
