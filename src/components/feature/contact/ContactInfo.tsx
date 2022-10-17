import { createStyles, ThemeIcon, Text, Box, Stack } from '@mantine/core';
import { IconSun, IconPhone, IconAt } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        color: theme.white,
    },

    icon: {
        marginRight: theme.spacing.md,
        backgroundColor: 'transparent',
    },
}));

interface ContactIconProps {
    icon: React.FC<any>;
    title: React.ReactNode;
    description: React.ReactNode;
}

function ContactIcon(props: ContactIconProps) {
    const { icon: Icon, title, description } = props
    const { classes } = useStyles();
    return (
        <div className={classes.wrapper}>
            <ThemeIcon size={40} radius="md" className={classes.icon}>
                <Icon size={24} />
            </ThemeIcon>
            <div>
                <Text size="xs" className="text-white">
                    {title}
                </Text>
                <Text className="text-white">{description}</Text>
            </div>
        </div>
    );
}

const ContactInfo = () => {
    const contactInfo = [
        { title: 'Email', description: 'care@breezeboutique.in', icon: IconAt },
        { title: 'Phone', description: '+91 8925769663', icon: IconPhone },
        { title: 'Working hours', description: '8 a.m. - 11 p.m.', icon: IconSun },
    ];
    return (
        <Box>
            <Stack>{contactInfo.map((item, index) => <ContactIcon key={index} {...item} />)}</Stack>
        </Box>
    );
}

export default ContactInfo