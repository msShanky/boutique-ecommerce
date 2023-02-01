type IdentityData = {
	avatar_url: string;
	email: string;
	email_verified: boolean;
	full_name: string;
	iss: string;
	name: string;
	picture: string;
	provider_id: string;
	sub: string;
};

type UserIdentity = {
	id: string;
	provider: string;
	last_sign_in_at: string;
	created_at: string;
	updated_at: string;
	user_id: string;
	identity_data: IdentityData;
};

type OAuthUser = {
	id: string;
	app_metadata?: { provider: string; providers: Array<string> };
	aud?: string;
	confirmed_at: string;
	created_at: string;
	email: string;
	email_confirmed_at: string;
	identities: Array<UserIdentity>;
};

type UserAuthType = {
	access_token: string;
	expires_at: number;
	expired_in: number;
	provider_token: string;
	refresh_token: string;
	token_type: string;
	user: OAuthUser;
};

type AuthFormInitialType = {
	name: string;
	terms: boolean;
	email: string;
	password: string;
};

type UserSignInType = {
	email: string;
	password: string;
};

type GoogleAuthUser = {
	aal: string;
	amr: Array<Record<any, any>>;
	app_metadata?: {
		provide: string;
		providers?: Array<string>;
	};
	id: string;
	aud?: string;
	email: string;
	role?: string;
	session_id?: string;
	confirmed_at?: string | null;
	created_at?: string | null;
	exp: number;
	identities?: Array<UserIdentity>;
	phone?: string;
	sub: string;
	updated_at?: string | null;
	user_metadata?: IdentityData;
};
