import { useLazyGetUserWishlistQuery } from "@/reducer/breezeBaseApi";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";

export function useWishlist(id: string | undefined) {
	const [getUserWishlist, userWishlistResponse] = useLazyGetUserWishlistQuery();
	const [userWishlist, setUserWishlist] = useState<number[]>([]);

	useEffect(() => {
		if (userWishlistResponse.status === "fulfilled" && userWishlistResponse?.data?.body) {
			const responseData = userWishlistResponse.data.body;
			const wishlistArray = responseData.length
				? responseData.map((wishlist) => {
						return wishlist.product_id || 0;
				  })
				: [];
			setUserWishlist(wishlistArray);
		}
	}, [userWishlistResponse]);

	useEffect(() => {
		if (id) {
			getUserWishlist(id);
		}
	}, [id, getUserWishlist]);

	const handleWishlist = async (product: ProductWithRelations) => {
		if (!id) return;
		// TODO: Handle the loader for the user_wishlist

		const supbaseWishlistClient = supabaseClient.from("user_wishlist");

		const isWishlisted = userWishlist.includes(product.id);

		if (isWishlisted) {
			await supbaseWishlistClient.delete().match({ product_id: product.id });
		} else {
			const postBody = { product_id: product.id, user_id: id };
			await supbaseWishlistClient.insert([postBody]);
		}

		getUserWishlist(id);
	};

	return { wishlist: userWishlist, handleWishlist };
}
