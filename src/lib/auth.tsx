import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthProvider | null>(null);

type AuthProviderType = {
	supabase: SupabaseClient;
	[key: string]: any;
};

type AuthProvider = {
	session: Session;
	user: User;
	signOut: () => void;
};

export const AuthProvider = ({ supabase, ...props }: AuthProviderType) => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const activeSession: Session | null = supabase.auth.session();
		setSession(activeSession);
		setUser(activeSession?.user ?? null);

		const { data: authListener } = supabase.auth.onAuthStateChange((event, currentSession) => {
			setSession(currentSession);
			setUser(currentSession?.user ?? null);
			// This is needed to set the cookie for SSR
			fetch("/api/auth", {
				method: "POST",
				headers: new Headers({ "Content-Type": "application/json" }),
				credentials: "same-origin",
				body: JSON.stringify({ event, session: currentSession }),
			}).then((res) => res.json());
		});

		return () => {
			authListener?.unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider
			value={{ session: session as Session, user: user as User, signOut: () => supabase.auth.signOut() }}
			{...props}
		/>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context as AuthProvider;
};
