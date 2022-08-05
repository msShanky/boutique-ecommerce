import React from "react";
import AppNavigation from "./AppNavigation";
import HeaderHighlightBar from "./HeaderHighlightBar";

const AppHeader = () => {
	return (
		<nav className="z-0 w-full mx-auto h-28">
			<HeaderHighlightBar />
			<AppNavigation />
		</nav>
	);
};

export default AppHeader;
