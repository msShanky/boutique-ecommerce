import React, { FunctionComponent, ReactElement } from "react";
import ProductContent from "./ProductContent";

type AdminContentProps = {
	content: AdminPageContent;
};

const AdminContent: FunctionComponent<AdminContentProps> = (props) => {
	const { content } = props;

	const contentMapping: Record<AdminPageContent, ReactElement> = {
		product: <ProductContent />,
		order: <p>Orders Page</p>,
		report: <p>Report Page</p>,
		dashboard: <p>Dashboard Page</p>,
		category: <p>Category Page</p>,
	};

	return <>{contentMapping[content]}</>;
};

export default AdminContent;
