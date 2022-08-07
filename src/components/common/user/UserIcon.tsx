import React from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { IconUser } from "@tabler/icons";
import { LinkIcon } from "../header";
import { UserMenu, UserLoader } from ".";

const UserIcon = () => {
	const { user, isLoading } = useUser();

	if (isLoading) {
		return <UserLoader />;
	}

	if (!user) {
		return <LinkIcon icon={<IconUser size={20} />} link="/login" label="Login" />;
	}

	return <UserMenu user={user} />;
};

export default UserIcon;
