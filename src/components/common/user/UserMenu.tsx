import { Menu } from "@mantine/core";
import React, { FunctionComponent, useState } from "react";
import { IconPackage, IconUser, IconLogout } from "@tabler/icons";
import { User } from "@supabase/auth-helpers-react";
import { useClickOutside } from "@mantine/hooks";

import UserAvatar from "./UserAvatar";
import Link from "next/link";

type UserMenuProps = {
	user: User;
};

// TODO: If the user is an administrator then show the button to redirect to the admin page

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
					<Link href="/user/orders" passHref>
						<Menu.Item icon={<IconPackage size={14} />}>Orders</Menu.Item>
					</Link>
					<Link href="/user/profile" passHref>
						<Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
					</Link>
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
