import { ActionIcon, TextInput } from "@mantine/core";
import React from "react";
import { ArrowRight, Search } from "tabler-icons-react";

const SearchInput = () => {
	return (
		<TextInput
			icon={<Search size={18} />}
			size="md"
			rightSection={
				<ActionIcon className="bg-pink" size={32} variant="filled">
					<ArrowRight size={18} />
				</ActionIcon>
			}
			placeholder="Search products"
			rightSectionWidth={42}
		/>
	);
};

export default SearchInput;
