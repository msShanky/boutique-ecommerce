import Link from "next/link";
import { Mail, PhoneCall, CurrencyRupee, User, Heart, ShoppingCart } from "tabler-icons-react";

const HeaderHighlightBar = () => {
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
					<div className="flex flex-row items-center space-x-2">
						<CurrencyRupee size={15} />
						<p>INR</p>
					</div>
					<Link href="/login" passHref>
						<div className="flex flex-row items-center space-x-2 hover:cursor-pointer">
							<p>Login</p>
							<User size={15} />
						</div>
					</Link>
					<div className="flex flex-row items-center space-x-2">
						<p>WishList</p>
						<Heart size={15} />
					</div>
					<Link href="/cart" passHref>
						<div className="flex flex-row items-center hover:cursor-pointer">
							<ShoppingCart size={15} />
						</div>
					</Link>
				</div>
			</section>
		</main>
	);
};

export default HeaderHighlightBar;
