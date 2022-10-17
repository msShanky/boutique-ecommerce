import React from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/layout";
import CategoryContent from "@/components/feature/admin/CategoryContent";

// TODO: Optimize the initial data fetching to pre-populate the data from api
const ProductCategoryPage = () => {
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
