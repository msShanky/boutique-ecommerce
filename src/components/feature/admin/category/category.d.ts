type TableComponentTypes = "image" | "toggle" | "action_tray";

type TableColumn = {
	value: string;
	label: string;
	componentType?: string;
};

type TableColumns = Array<TableColumn>;
