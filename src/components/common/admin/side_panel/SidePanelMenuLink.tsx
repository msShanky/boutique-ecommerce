import React, { FunctionComponent, MouseEvent } from "react";
import { Button } from "@mantine/core";
import Link from "next/link";

type SidePanelMenuLinkProps = {
	isActive: boolean;
	handleMenuClick: (event: MouseEvent<HTMLAnchorElement>, item: AdminPanelLink) => void;
	item: AdminPanelLink;
};

const baseClass = `flex flex-row space-x-6 items-center text-sm px-3 py-2 w-full hover:cursor-pointer hover:bg-violet hover:text-white hover:bg-opacity-40`;

// TODO: Convert this component into a next/link for internal admin page routing
const SidePanelMenuLink: FunctionComponent<SidePanelMenuLinkProps> = (props) => {
	const { isActive, handleMenuClick, item } = props;
	return (
		<Link href={`/admin/${item.link}`} passHref>
			<Button
				className={`${baseClass} ${isActive ? "bg-violet text-white bg-opacity-80" : "bg-transparent"}`}
				onClick={(event: any) => handleMenuClick(event, item)}
			>
				<item.icon stroke={1.5} />
				<span className="self-end">{item.label}</span>
			</Button>
		</Link>
	);
};

export default SidePanelMenuLink;
