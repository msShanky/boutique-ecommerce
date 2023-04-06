import { createStyles, ThemeIcon, Text, Box, Stack } from "@mantine/core";
import { IconPhone, IconAt } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
	wrapper: {
		display: "flex",
		alignItems: "center",
		color: theme.white,
	},

	icon: {
		marginRight: theme.spacing.md,
		backgroundColor: "transparent",
	},
}));

interface ContactIconProps {
	icon: React.FC<any>;
	title: React.ReactNode;
	description: React.ReactNode;
}

function ContactIcon(props: ContactIconProps) {
	const { icon: Icon, title, description } = props;
	const { classes } = useStyles();
	return (
		<div className='flex items-center bg-white'>
			<ThemeIcon size={30} radius="md" className={classes.icon}>
				<Icon className="stroke-black" size={30} />
			</ThemeIcon>
			<div>
				<Text className="text-xs text-primaryBlack">
					{title}
				</Text>
				<Text className="text-sm text-primaryBlack md:text-base">{description}</Text>
			</div>
		</div>
	);
}

const ContactInfo = () => {
	const contactInfo = [
		{ title: "Email", description: "care@breezeboutique.in", icon: IconAt },
		{ title: "Phone", description: "+91 73584 89990", icon: IconPhone },
		// { title: "Working hours", description: "8 a.m. - 11 p.m.", icon: IconSun },
	];
	return (
		<Box>
			<Stack>
				{contactInfo.map((item, index) => (
					<ContactIcon key={index} {...item} />
				))}
			</Stack>
		</Box>
	);
};

export default ContactInfo;
