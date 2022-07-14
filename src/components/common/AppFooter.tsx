import { Button, Text, TextInput, Title } from "@mantine/core";
import React from "react";

const AppHeader = () => {
	return (
		<footer className="w-full bg-violet-light h-[532px]">
			<section className="container flex pt-24 mx-auto space-x-20">
				<div className="w-1/3 space-y-4">
					{/* <Title className="text-2xl text-page">Logo</Title>
					<TextInput
						rightSection={
							<Button className="bg-pink hover:bg-violet" variant="filled">
								Sign Up
							</Button>
						}
						placeholder="Enter An Email Address"
						rightSectionWidth={90}
					/> */}
					{/* <Text>Contact Info</Text>
					<Text>care@breezeboutique.in</Text> */}
				</div>
				{/* <div>
					<Title className="text-2xl text-page">Categories</Title>
					<div className="mt-8 space-y-4 text-page text-opacity-30">
						<Text>Category 1</Text>
						<Text>Category 2</Text>
						<Text>Category 3</Text>
						<Text>Category 4</Text>
					</div>
				</div> */}
			</section>
		</footer>
	);
};

export default AppHeader;
