import { Button, Skeleton } from "@mantine/core";
import React from "react";

const UserLoader = () => {
	return (
		<div className="flex flex-row w-40 space-x-4">
			<Skeleton height={35} />
			<Skeleton height={35} width={50} circle />
		</div>
	);
};

export default UserLoader;
