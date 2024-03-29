import { Tuple, DefaultMantineColor } from "@mantine/core";

type ExtendedCustomColors = "brand-yellow" | DefaultMantineColor;

declare module "@mantine/core" {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
	}
}
