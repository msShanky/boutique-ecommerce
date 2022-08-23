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
		report: <p>Orders Page</p>,
		dashboard: <p>Dashboard Page</p>,
	};

	return <>{contentMapping[content]}</>;
};

export default AdminContent;
