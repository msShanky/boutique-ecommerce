import React, { useEffect } from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/layout";
import { ProductContent } from "@/components/feature";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

// TODO: Optimize the initial data fetching to pre-populate the data from api
const ProductManagementPage = () => {
	return (
		<AdminLayout>
			<>
				<Head>
					<title>BB | Product Management</title>
				</Head>
				<section className="w-full pb-12">
					<ProductContent />
				</section>
			</>
		</AdminLayout>
	);
};

export default ProductManagementPage;
