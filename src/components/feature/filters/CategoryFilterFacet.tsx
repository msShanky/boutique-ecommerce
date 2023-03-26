import React, { FC } from "react";

type CategoryFilterFacetTypes = {
	categoryFilter: SubCategoryWithRelations;
};

export const CategoryFilterFacet: FC<CategoryFilterFacetTypes> = (props) => {
	const { categoryFilter } = props;
	return <div>{categoryFilter.name}</div>;
};
