import React from "react";
import { Title, Button } from "@mantine/core";
import { useLottie } from "lottie-react";

import underConstructionSite from "animations/93663-site-prep.json";

const options = {
	animationData: underConstructionSite,
	loop: true,
	style: {
		width: "650px",
	},
};

const UnderConstructionPage = () => {
	const { View } = useLottie(options);
	return (
		<main className="container flex flex-col items-center w-screen mx-auto mt-32 text-center md:mt-20 gap-y-8">
			<div>{View}</div>
			<Title className="text-xl font-extrabold xl:text-2xl">
				Hey, we are at out last mile of getting the website up
			</Title>
			<Title className="text-lg font-thin xl:text-xl">
				We really appreciate your patience, please keep following us on the below social media platforms. To get the
				latest updates
			</Title>
			{/* <Button className="w-40 bg-primaryBlack hover:bg-primary hover:text-black">Take me home</Button> */}
		</main>
	);
};

export default UnderConstructionPage;
