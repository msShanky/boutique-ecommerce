import { Menu } from "@mantine/core";
import React, { FunctionComponent, useState } from "react";
import { IconPackage, IconUser, IconLogout } from "@tabler/icons";
import { User } from "@supabase/auth-helpers-react";
import { useClickOutside } from "@mantine/hooks";

import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { persistor } from "app/store";
import Router, { useRouter } from "next/router";

type UserMenuProps = {
	user: User;
};

// TODO: If the user is an administrator then show the button to redirect to the admin page

const UserMenu: FunctionComponent<UserMenuProps> = (props) => {
	const { user } = props;
	const [opened, setOpened] = useState(false);
	const ref = useClickOutside(() => setOpened(false));
	const router = useRouter();

	const handleLogout = () => {
		persistor.purge();
		router.push('/api/auth/logout')
	}

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
					<Menu.Item color="red" onClick={handleLogout} icon={<IconLogout size={14} />}>
						Log Out
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</div>
	);
};

export default UserMenu;
