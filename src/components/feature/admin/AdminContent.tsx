import React, { FunctionComponent, ReactElement } from "react";
import ProductContent from "./ProductContent";

type AdminContentProps = {
	content: AdminPageContent;
};

const AdminContent: FunctionComponent<AdminContentProps> = (props) => {
	const { content } = props;

	const contentMapping: Record<AdminPageContent, ReactElement> = {
		product: <ProductContent />,
		// TODO: Manage the orders for the admin
		order: <p>Orders Page</p>,
		// TODO: Manage the reports for the admin
		report: <p>Report Page</p>,
		// TODO: Manage the dashboard for the admin
		dashboard: <p>Dashboard Page</p>,
		// TODO: Manage the category for the admin
		category: <p>Category Page</p>,
	};

	return <>{contentMapping[content]}</>;
};

export default AdminContent;
