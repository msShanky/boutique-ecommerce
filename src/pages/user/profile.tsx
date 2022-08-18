import { AppLayout } from "@/components/layout";
import { Avatar, Title } from "@mantine/core";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { definitions } from "types/supabase";

const ProfilePage = () => {
	const { user, error } = useUser();
	const [userProfile, setUserProfile] = useState<definitions["profiles"]>();

	const fetchUserProfile = async () => {
		const { data, error } = await supabaseClient.from("profiles").select(`*`);
		if (!error) {
			console.log(data[0]);
			setUserProfile(data[0]);
		}
	};

	useEffect(() => {
		if (user) fetchUserProfile();
	}, [user]);

	const userName = userProfile?.username?.split(" ");
	const userInitials = userName && `${userName[0][0].toUpperCase()} ${userName[0][0].toUpperCase()}`;

	return (
		<AppLayout>
			<section className="container flex flex-col mx-auto my-20">
				<div className="flex flex-col self-center items-center w-6/12 shadow-lg bg-violet-light h-96 rounded-xl p-4">
					{userProfile?.avatar_url ? (
						<Avatar className="rounded-full" size={120} src={userProfile?.avatar_url as string} />
					) : (
						<Avatar>{userInitials}</Avatar>
					)}
					<Title>{userProfile?.username}</Title>
				</div>
			</section>
		</AppLayout>
	);
};

export default ProfilePage;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
