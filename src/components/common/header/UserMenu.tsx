import { Menu } from "@mantine/core";
import React, { FunctionComponent, useState } from "react";
import { IconPackage, IconUser, IconLogout } from "@tabler/icons";
import { User } from "@supabase/auth-helpers-react";
import { useClickOutside } from "@mantine/hooks";

// import UserLoader from "./UserLoader";
import UserAvatar from "./UserAvatar";
import { signOut } from "../../../utils/auth";

type UserMenuProps = {
	user: User;
};

const UserMenu: FunctionComponent<UserMenuProps> = (props) => {
	const { user } = props;
	const [opened, setOpened] = useState(false);
	const ref = useClickOutside(() => setOpened(false));

	const handleLogout = async () => {
		console.log("The user have clicked log out button");
		const response = await signOut();
		console.log(response, "SIGN OUT RESPONSE");
	};

	return (
		<div className="z-50" ref={ref}>
			<UserAvatar user={user} handleToggle={() => setOpened(!opened)} />
			<Menu
				opened={opened}
				onChange={setOpened}
				zIndex={999}
				shadow="md"
				width={200}
				position="bottom-start"
				transition={"fade"}
			>
				<Menu.Dropdown>
					<Menu.Label>Actions</Menu.Label>
					<Menu.Item icon={<IconPackage size={14} />}>Orders</Menu.Item>
					<Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
					<Menu.Divider />
					<Menu.Item onClick={handleLogout} color="red" icon={<IconLogout size={14} />}>
						Log Out
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</div>
	);
};

export default UserMenu;
