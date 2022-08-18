import { ActionIcon, TextInput } from "@mantine/core";
import React from "react";
import { IconArrowRight, IconSearch } from "@tabler/icons";

const SearchInput = () => {
	return (
		<TextInput
			icon={<IconSearch size={18} />}
			size="md"
			className="-z-0"
			rightSection={
				<ActionIcon className="bg-pink" size={32} variant="filled">
					<IconArrowRight size={18} />
				</ActionIcon>
			}
			placeholder="Search products"
			rightSectionWidth={42}
		/>
	);
};

export default SearchInput;
