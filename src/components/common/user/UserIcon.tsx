import React from "react";
import { IconUser } from "@tabler/icons";
import { LinkIcon } from "../header";
import { UserMenu } from ".";
import { useAuth } from "@/lib/auth";

const UserIcon = () => {
	const { user } = useAuth();

	// if (isLoading) {
	// 	return <UserLoader />;
	// }

	if (!user) {
		return <LinkIcon icon={<IconUser size={20} />} link="/login" label="Login" />;
	}

	return <UserMenu user={user} />;
};

export default UserIcon;
