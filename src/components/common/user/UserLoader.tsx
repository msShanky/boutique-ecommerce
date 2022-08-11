import { Button, Skeleton } from "@mantine/core";
import React from "react";

const UserLoader = () => {
	return (
		<div className="flex w-full space-x-4 animate-pulse">
			<div className="w-24 h-8 rounded bg-opacity-40 bg-pink" />
			<div className="w-8 h-8 rounded-full bg-opacity-40 bg-pink" />
		</div>
	);
};

export default UserLoader;
