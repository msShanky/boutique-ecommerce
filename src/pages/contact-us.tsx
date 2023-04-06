import { AppLayout, AppSection } from "@/components/layout";
import { createStyles, Text, Title, SimpleGrid, TextInput, Textarea, Button, Group, ActionIcon } from "@mantine/core";
import Head from "next/head";
import { IconBuilding, IconBrandInstagram } from "@tabler/icons";
import { ContactInfo } from "../components/feature/contact";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
	wrapper: {
		minHeight: 400,
		boxSizing: "border-box",
		padding: theme.spacing.xl * 2.5,
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: theme.spacing.xl * 1.5,
		},
	},

	description: {
		maxWidth: 300,
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			maxWidth: "100%",
		},
	},

	form: {
		backgroundColor: theme.white,
		padding: theme.spacing.xl,
		borderRadius: theme.radius.md,
		boxShadow: theme.shadows.lg,
	},

	social: {
		color: theme.white,

		"&:hover": {
			color: theme.colors[theme.primaryColor][1],
		},
	},

	input: {
		backgroundColor: theme.white,
		borderColor: theme.colors.gray[4],
		color: theme.black,

		"&::placeholder": {
			color: theme.colors.gray[5],
		},
	},

	inputLabel: {
		color: theme.black,
	},
}));

const social = [{ Icon: IconBrandInstagram, link: "https://www.instagram.com/breeze_boutique22" }];

function ContactUs() {
	const { classes } = useStyles();

	const icons = social.map(({ Icon, link }, index) => (
		<ActionIcon key={index} size={28} className={classes.social} variant="transparent">
			<Link href={link} passHref>
				<a target="_blank">
					<Icon className="stroke-primaryBlack" size={40} stroke={1.5} />
				</a>
			</Link>
		</ActionIcon>
	));

	return (
		<AppLayout pageTitle="Breeze Boutique | Contact Us">
			<>
				<AppSection>
					<div
						className={`md:w-full w-10/12 rounded-xl bg-gradient-to-r from-primary to-primaryBlack ${classes.wrapper}`}
					>
						<SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
							<div>
								<Title className="leading-none text-white">Contact us</Title>
								<Text className={`text-white ${classes.description}`} mt="sm" mb={30}>
									Please feel free to contact us, will respond to your queries with our best effort
								</Text>
								{/* <Text className={`text-white ${classes.description}`} mt="sm" mb={30}>
									Leave your email and we will get back to you within 24 hours
								</Text> */}
								{/* <ContactInfo /> */}
								{/* <Group mt="xl">{icons}</Group> */}
							</div>
							<div className="flex flex-col w-full p-6 bg-white rounded-lg gap-y-4">
								<div className="flex flex-col gap-8">
									<span className="flex items-center gap-2">
										<IconBuilding /> <Text className="font-sans text-sm md:text-md">Address</Text>
									</span>
									<Text className="font-sans text-sm md:text-lg">
										31, 1st Main Rd, Phase-2, Thirumalai Nagar Annexe, Perungudi, Chennai, Tamil Nadu 600096
									</Text>
								</div>
								<ContactInfo />
								<div>
									<h3>Social Links</h3>
									<Group mt="xl">{icons}</Group>
								</div>
							</div>
							{/* <div className={classes.form}>
								<TextInput
									label="Email"
									placeholder="your@email.com"
									required
									classNames={{ input: classes.input, label: classes.inputLabel }}
								/>
								<TextInput
									label="Name"
									placeholder="John Doe"
									mt="md"
									classNames={{ input: classes.input, label: classes.inputLabel }}
								/>
								<Textarea
									required
									label="Your message"
									placeholder="I want to order your goods"
									minRows={4}
									mt="md"
									classNames={{ input: classes.input, label: classes.inputLabel }}
								/>

								<Group position="right" mt="md">
									<Button className="text-white border-violet bg-violet hover:bg-white hover:text-violet">
										Send message
									</Button>
								</Group>
							</div> */}
						</SimpleGrid>
					</div>
				</AppSection>
			</>
		</AppLayout>
	);
}

export default ContactUs;
