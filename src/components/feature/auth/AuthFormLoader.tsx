import React from "react";
import { Divider, Group, Stack } from "@mantine/core";
import { Paper } from "@mantine/core";

export const AuthFormLoader = () => {
	return (
		<Paper radius="lg" p="lg" className="w-10/12 mx-auto my-20 shadow-lg 2xl:w-4/12 lg:w-6/12" withBorder>
			{/* <div className="w-40 h-12 bg-black rounded-full hover:bg-primary/60 hover:text-primaryBlack" /> */}
			<div className="flex justify-center my-6 ">
				<span className="w-48 h-12 rounded-full text-primaryBlack bg-primary/70 hover:bg-secondary" />
			</div>
			<Divider labelPosition="center" my="lg" />
			<section>
				<Stack>
					<div className="w-full h-16 rounded-full bg-primary/70" />
					<div className="w-full h-16 rounded-full bg-primary/70" />
					<div className="w-full h-16 rounded-full bg-primary/70" />
				</Stack>
				<Group position="apart" mt="xl">
					<div className="flex items-center gap-2">
						<div className="h-8 font-sans text-xs bg-primaryAlt " />
						<div className="h-8 font-sans text-xs bg-primaryAlt " />
					</div>
					<div className="w-40 h-12 rounded-full bg-primary/70" />
				</Group>
			</section>
		</Paper>
	);
};
