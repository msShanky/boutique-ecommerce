import { AppLayout } from "@/components/layout";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

const ProfilePage = () => {
	return (
		<AppLayout>
			<section className="container flex flex-col mx-auto my-20">
				<h1>Profile Page</h1>
				<div className="flex self-center justify-center w-6/12 shadow-lg bg-violet-light h-96 rounded-xl">
					<form className="w-full p-8" action="">
						<input type="text" />
					</form>
				</div>
			</section>
		</AppLayout>
	);
};

export default ProfilePage;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
