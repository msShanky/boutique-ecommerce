import React, { FunctionComponent } from "react";

type AppSectionPops = {
	children: React.ReactElement;
};

const AppSection: FunctionComponent<AppSectionPops> = ({ children }) => {
	return (
		<section className="container flex flex-wrap justify-center gap-10 mx-auto my-20 2xl:min-h-[550px]">
			{children}
		</section>
	);
};

export default AppSection;
