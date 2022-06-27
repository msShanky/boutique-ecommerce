import { Button, Image, Text, Title } from "@mantine/core";
import React from "react";

const HomeBanner = () => {
	return (
		<section className="w-full bg-violet-light min-h-[764px] flex items-center">
			<div className="container flex flex-row items-center mx-auto space-x-10">
				<div className="w-3/6 space-y-8">
					<Text className="font-bold text-pink ">Best Fashion For Your Needs...</Text>
					<Title className="text-5xl text-black ">New Fashion Collection Trends 2022</Title>
					<Text className="text-violet-subtext">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
					</Text>
					<Button className="text-white bg-pink hover:bg-violet">Shop Now</Button>
				</div>
				<div className="flex justify-center w-3/6">
					<Image className="w-4/5" src="/images/promotional_header.svg" alt="Home Banner" />
				</div>
			</div>
		</section>
	);
};

export default HomeBanner;
