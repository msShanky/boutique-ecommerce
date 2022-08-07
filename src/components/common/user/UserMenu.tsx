import { Menu } from "@mantine/core";
import React, { FunctionComponent, useState } from "react";
import { IconPackage, IconUser, IconLogout } from "@tabler/icons";
import { User } from "@supabase/auth-helpers-react";
import { useClickOutside } from "@mantine/hooks";

// import UserLoader from "./UserLoader";
import UserAvatar from "./UserAvatar";
import { signOut } from "../../../utils/auth";
import Link from "next/link";

type UserMenuProps = {
	user: User;
};

const UserMenu: FunctionComponent<UserMenuProps> = (props) => {
	const { user } = props;
	const [opened, setOpened] = useState(false);
	const ref = useClickOutside(() => setOpened(false));

	return (
		<div className="" ref={ref}>
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
					<Link href="/api/auth/logout" passHref>
						<Menu.Item color="red" icon={<IconLogout size={14} />}>
							Log Out
						</Menu.Item>
					</Link>
				</Menu.Dropdown>
			</Menu>
		</div>
	);
};

export default UserMenu;