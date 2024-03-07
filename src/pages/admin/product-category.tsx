import React from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/layout";
import CategoryContent from "@/components/feature/admin/CategoryContent";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

// TODO: Optimize the initial data fetching to pre-populate the data from api
const ProductCategoryPage = () => {
	const { user, isLoading: userLoading } = useUser();
	const router = useRouter();

	// if (!user && !userLoading) {
	// 	router.push("/");
	// }

	return (
		<AdminLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin Product Category</title>
				</Head>
				<section className="w-full">
					<CategoryContent />
				</section>
			</>
		</AdminLayout>
	);
};

export default ProductCategoryPage;
