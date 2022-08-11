import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { AppLayout } from "@/components/layout";

const OrdersPage = () => {
	return (
		<AppLayout>
			<h1>Orders Page</h1>
		</AppLayout>
	);
};

export default OrdersPage;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
