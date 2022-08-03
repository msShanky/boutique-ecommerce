import Link from "next/link";
import { Mail, PhoneCall, User, Heart, ShoppingCart } from "tabler-icons-react";
import { useAppSelector } from "../../app/hooks";

const HeaderHighlightBar = () => {
	const { products } = useAppSelector((state) => state.cart);

	return (
		<main className="flex flex-col bg-violet">
			<section
				role="header_highlight"
				className="container flex flex-row justify-between w-full mx-auto text-white h-11 opacity-90"
			>
				{/* Left Content in Menu */}
				<div className="flex flex-row items-center space-x-8">
					<div className="flex flex-row items-center space-x-2">
						<Mail size={15} />
						<p>care@breezeboutique.in</p>
					</div>
					<div className="flex flex-row items-center space-x-2">
						<PhoneCall size={15} />
						<p>+91 8925769663</p>
					</div>
				</div>
				{/* Right Content in Menu */}
				<div className="flex flex-row items-center space-x-8">
					{/* <div className="flex flex-row items-center space-x-2">
						<CurrencyRupee size={25} />
						<p>INR</p>
					</div> */}
					<Link href="/login" passHref>
						<div className="flex flex-row items-center space-x-2 hover:cursor-pointer">
							<p>Login</p>
							<User size={20} />
						</div>
					</Link>
					<div className="flex flex-row items-center space-x-2">
						<p>WishList</p>
						<Heart size={20} />
					</div>
					<Link href="/cart" passHref>
						<div className="relative flex flex-row items-center hover:cursor-pointer">
							{products.length > 0 && (
								<div className="absolute flex items-center justify-center w-4 h-4 rounded-full -top-1 -right-1 bg-pink animate-pulse">
									<span className="font-sans text-xs text-white">{products.length}</span>
								</div>
							)}
							<ShoppingCart size={25} />
						</div>
					</Link>
				</div>
			</section>
		</main>
	);
};

export default HeaderHighlightBar;
