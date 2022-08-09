import React from "react";
import { IconUser } from "@tabler/icons";
import { LinkIcon } from "../header";
import { UserMenu } from ".";
// import { useAuth } from "@/lib/auth";
import { useUser } from "@supabase/auth-helpers-react";

const UserIcon = () => {
	const { user } = useUser();

	// console.log("THE USER VALUE FETCHED IS", user);

	// if (isLoading) {
	// 	return <UserLoader />;
	// }

	if (!user) {
		return <LinkIcon icon={<IconUser size={20} />} link="/login" label="Login" />;
	}

	return <UserMenu user={user} />;
};

export default UserIcon;
