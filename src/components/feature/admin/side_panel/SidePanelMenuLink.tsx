import React, { FunctionComponent, MouseEvent } from "react";

type SidePanelMenuLinkProps = {
	isActive: boolean;
	handleMenuClick: (event: MouseEvent<HTMLAnchorElement>, item: AdminPanelLink) => void;
	item: AdminPanelLink;
};

const baseClass = `flex flex-row space-x-6 items-center text-sm px-3 py-2 w-full hover:cursor-pointer hover:bg-violet hover:text-white hover:bg-opacity-40`;

const SidePanelMenuLink: FunctionComponent<SidePanelMenuLinkProps> = (props) => {
	const { isActive, handleMenuClick, item } = props;
	return (
		<a
			className={`${baseClass} ${isActive ? "bg-violet text-white bg-opacity-80" : "bg-transparent"}`}
			onClick={(event) => handleMenuClick(event, item)}
		>
			<item.icon stroke={1.5} />
			<span className="self-end">{item.label}</span>
		</a>
	);
};

export default SidePanelMenuLink;
