const formatUserMetadata = (userIdentity: IdentityData) => {
	const [firstName, lastName] = userIdentity.name.split(" ");
	return {
		firstName,
		lastName,
		email: userIdentity.email,
		avatarUrl: userIdentity.avatar_url,
	};
};

export const getUserProfileFromGoogle = (user: GoogleAuthUser) => {
	if (user.user_metadata) {
		return formatUserMetadata;
	}

	return {
		firstName: null,
		lastName: null,
		email: user.email,
		avatarUrl: null,
	};
};
