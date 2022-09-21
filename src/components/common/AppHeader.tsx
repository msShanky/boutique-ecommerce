import React, { FunctionComponent } from "react";
import AppNavigation from "./AppNavigation";
import HeaderHighlightBar from "./HeaderHighlightBar";

type AppHeaderProps = {
	isAdmin?: boolean;
};

const AppHeader: FunctionComponent<AppHeaderProps> = (props) => {
	const { isAdmin } = props;
	return (
		<nav className={`w-full mx-auto ${isAdmin ? "h-14" : "h-28"}`}>
			<HeaderHighlightBar />
			{!isAdmin && <AppNavigation />}
		</nav>
	);
};

export default AppHeader;
