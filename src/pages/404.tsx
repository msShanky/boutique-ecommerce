import { NextPage } from "next";
import { useLottie } from "lottie-react";

import notFoundRobot from "animations/31159-robot-404.json";
import { Title } from "@mantine/core";
import { Button } from "@mantine/core";
import Link from "next/link";

const options = {
	animationData: notFoundRobot,
	loop: true,
	style: {
		width: "350px",
	},
};

const PageNotFound: NextPage = (props) => {
	const { View } = useLottie(options);
	return (
		<main className="container flex flex-col items-center w-screen mx-auto mt-32 text-center md:mt-20 gap-y-8">
			<div>{View}</div>
			<Title className="text-4xl font-extrabold xl:text-6xl">Page Not Found</Title>
			<Title className="text-2xl font-thin xl:text-4xl">wow such empty</Title>
			<Link passHref href="/">
				<Button className="w-40 bg-primaryBlack hover:bg-primary hover:text-black">Take me home</Button>
			</Link>
		</main>
	);
};

export default PageNotFound;
