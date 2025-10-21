import {
	SignedIn,
	SignedOut,
	RedirectToSignIn,
	useUser,
} from "@clerk/clerk-react";
import Loading from "../Loading/Loading";

const SellerRoute = ({ children }) => {
	const { user, isLoaded } = useUser();

	if (!isLoaded)
		return (
			<div>
				<Loading />
			</div>
		);

	// Redirect non-sellers
	if (user?.publicMetadata?.role !== "seller") {
		return (
			<div className="flex items-center justify-center h-screen">
				<h2 className="text-2xl font-semibold text-red-600">
					🚫 Access denied – Seller only page
				</h2>
			</div>
		);
	}

	return (
		<>
			<SignedIn>{children}</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	);
};

export default SellerRoute;
