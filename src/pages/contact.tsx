import { AppLayout, AppSection } from '@/components/layout';
import {
    createStyles,
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Textarea,
    Button,
    Group,
    ActionIcon,
} from '@mantine/core';
import Head from "next/head";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import { ContactInfo } from '../components/feature/contact';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 400,
        boxSizing: 'border-box',
        padding: theme.spacing.xl * 2.5,
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            padding: theme.spacing.xl * 1.5,
        },
    },

    description: {
        maxWidth: 300,
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
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

        '&:hover': {
            color: theme.colors[theme.primaryColor][1],
        },
    },

    input: {
        backgroundColor: theme.white,
        borderColor: theme.colors.gray[4],
        color: theme.black,

        '&::placeholder': {
            color: theme.colors.gray[5],
        },
    },

    inputLabel: {
        color: theme.black,
    },
}));

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

function ContactUs() {
    const { classes } = useStyles();

    const icons = social.map((Icon, index) => (
        <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
            <Icon size={22} stroke={1.5} />
        </ActionIcon>
    ));

    return (
        <AppLayout>
            <>
                <Head>
                    <title>Breeze Boutique | Contact Us</title>
                </Head>
                    <div className={`bg-gradient-to-r from-violet to-violet-light ${classes.wrapper}`}>
                        <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                            <div>
                                <Title className="text-white leading-none">Contact us</Title>
                                <Text className={`text-white ${classes.description}`} mt="sm" mb={30}>
                                    Leave your email and we will get back to you within 24 hours
                                </Text>
                                <ContactInfo  />
                                <Group mt="xl">{icons}</Group>
                            </div>
                            <div className={classes.form}>
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
                                    <Button className="border-violet text-white bg-violet hover:bg-white hover:text-violet">Send message</Button>
                                </Group>
                            </div>
                        </SimpleGrid>
                    </div>
            </>
        </AppLayout>
    );
}

export default ContactUs