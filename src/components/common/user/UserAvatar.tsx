import { Image, Avatar, Button, Text } from "@mantine/core";
import { User } from "@supabase/supabase-js";
import React, { FunctionComponent, ReactElement } from "react";

type UserAvatarProps = {
	user: User;
	handleToggle: () => void;
};

const UserAvatar: FunctionComponent<UserAvatarProps> = (props): ReactElement => {
	const { user, handleToggle } = props;

	console.log("user ==> ", user);
	console.log("user image ==> ", user.user_metadata.avatar_url);
	const [firstName, lastName] = user.user_metadata.full_name.split(" ");
	const userInitials = `${firstName[0].toUpperCase()} ${lastName[0].toUpperCase()}`;
	const userImage = user?.user_metadata.avatar_url ?? undefined;

	return (
		<Button
			unstyled
			classNames={{
				root: ":focus-visible:border-none",
				label: "relative flex flex-row items-center space-x-4 ",
			}}
			className=" hover:cursor-pointer"
			onClick={handleToggle}
		>
			<Text className="text-white">{firstName}</Text>
			{userImage ? (
				<Image
					alt="user icon"
					src={userImage}
					width={40}
					classNames={{
						imageWrapper: "rounded-full",
						image: "rounded-full",
					}}
				/>
			) : (
				<Avatar size={30} radius="xl">
					{userInitials}
				</Avatar>
			)}
		</Button>
	);
};

export default UserAvatar;
