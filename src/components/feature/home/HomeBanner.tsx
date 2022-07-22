import { Button, Image, Text, Title } from "@mantine/core";
import React from "react";

const HomeBanner = () => {
	return (
		<section className="w-full bg-violet-light min-h-[764px] flex items-center">
			<div className="container flex flex-row items-center mx-auto space-x-10">
				<div className="w-3/6 space-y-8">
					<Text className="font-sans font-bold text-pink">Be style be comfort</Text>
					<Title className="font-serif text-5xl text-black">Breeze Boutique</Title>
					<Text className="text-violet-subtext">Hold tight !!! We&apos;re launching really soon.</Text>
					{/* <Button className="text-white bg-pink hover:bg-violet">Shop Now</Button> */}
				</div>
				<div className="flex justify-center w-3/6">
					{/* <Image className="w-4/5" src="/images/promotional_header.svg" alt="Home Banner" /> */}
					<Image className="w-4/5" src="/images/under_construction.svg" alt="under construction" />
				</div>
			</div>
		</section>
	);
};

export default HomeBanner;
