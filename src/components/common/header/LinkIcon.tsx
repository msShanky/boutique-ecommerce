import React, { FunctionComponent, ReactElement } from "react";
import Link from "next/link";

type LinkIconProps = {
	icon: ReactElement;
	link: string;
	label?: string;
	dockCount?: number;
};

const NumberDocked = (props: { count: number }) => {
	return (
		<div className="absolute flex items-center justify-center w-4 h-4 rounded-full -top-1 -right-1 bg-pink animate-pulse">
			<span className="font-sans text-xs text-white">{props.count}</span>
		</div>
	);
};

const LinkIcon: FunctionComponent<LinkIconProps> = (props) => {
	const { dockCount, label } = props;

	return (
		<Link href={props.link} passHref>
			<div className="relative flex flex-row items-center space-x-2 hover:cursor-pointer">
				{(dockCount ? dockCount > 0 : false) && <NumberDocked count={dockCount as number} />}
				{label && <p>{label}</p>}
				{props.icon}
			</div>
		</Link>
	);
};

export default LinkIcon;
