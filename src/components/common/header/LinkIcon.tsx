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
		<div className="absolute flex items-center justify-center w-5 h-5 rounded-full -top-2 -right-2 bg-pink animate-pulse">
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
				{label && <p className="text-base text-white md:text-xs lg:text-base">{label}</p>}
				{props.icon}
			</div>
		</Link>
	);
};

export default LinkIcon;
