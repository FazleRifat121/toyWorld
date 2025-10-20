import { UserButton } from "@clerk/clerk-react";
import { FaShoppingCart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router";

const NavbarUserMenu = ({ cartCount, orderCount, wishlistCount, isSeller }) => {
	const navigate = useNavigate();

	return (
		<UserButton
			appearance={{ elements: { userButtonPopoverCard: "ml-4 mt-2" } }}
		>
			<UserButton.MenuItems className="absolute top-full right-0 mt-2 w-64 flex flex-col gap-2 bg-white shadow-lg rounded z-50 p-2">
				{/* Cart */}
				<UserButton.Action
					label={`Cart (${cartCount})`}
					labelIcon={<FaShoppingCart className="w-5 h-5" />}
					onClick={() => navigate("/cart")}
				/>

				{/* Orders */}
				<UserButton.Action
					label={`My Orders (${orderCount})`}
					labelIcon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-5 h-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3 7h18M3 12h18M3 17h18"
							/>
						</svg>
					}
					onClick={() => navigate("/my-orders")}
				/>

				{/* Wishlist */}
				<UserButton.Action
					label={`Wishlist (${wishlistCount})`}
					labelIcon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-5 h-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					}
					onClick={() => navigate("/wishlist")}
				/>

				{/* Seller Dashboard (optional) */}
				{isSeller && (
					<UserButton.Action
						label="Seller Dashboard"
						labelIcon={<MdDashboard size={24} />}
						onClick={() => navigate("/seller")}
					/>
				)}
			</UserButton.MenuItems>
		</UserButton>
	);
};

export default NavbarUserMenu;
