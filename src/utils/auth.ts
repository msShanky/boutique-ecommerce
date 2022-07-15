import { supabase } from "./supabaseClient";

export async function signInWithGoogle() {
	return await supabase.auth.signIn({
		provider: "google",
	});
}

export async function signOut() {
	const { error } = await supabase.auth.signOut();
}
