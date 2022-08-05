import { useUser } from "@supabase/auth-helpers-react";
import { IconMail, IconPhoneCall, IconUser, IconHeart, IconShoppingCart } from "@tabler/icons";
import { useAppSelector } from "../../app/hooks";
import { LinkIcon, UserLoader, UserMenu } from "./header";

const HeaderHighlightBar = () => {
	const { products } = useAppSelector((state) => state.cart);
	const { user, isLoading } = useUser();

	console.log(" The user value is ", user)

	return (
		<main className="flex flex-col bg-violet">
			<section
				role="header_highlight"
				className="container flex flex-row justify-between w-full mx-auto text-white h-11 opacity-90"
			>
				{/* Left Content in Menu */}
				<div className="flex flex-row items-center space-x-8">
					<div className="flex flex-row items-center space-x-2">
						<IconMail size={15} />
						<p>care@breezeboutique.in</p>
					</div>
					<div className="flex flex-row items-center space-x-2">
						<IconPhoneCall size={15} />
						<p>+91 8925769663</p>
					</div>
				</div>
				{/* Right Content in Menu */}
				<div className="relative flex flex-row items-center space-x-8">
					<>
						{!user && !isLoading && <LinkIcon icon={<IconUser size={20} />} link="/login" label="Login" />}
						{isLoading && <UserLoader />}
						{!isLoading && user && <UserMenu user={user} />}
					</>
					<LinkIcon icon={<IconHeart size={20} />} link="/wishlist" label="WishList" />
					<LinkIcon icon={<IconShoppingCart size={25} />} link="/cart" dockCount={products.length} />
				</div>
			</section>
		</main>
	);
};

export default HeaderHighlightBar;
