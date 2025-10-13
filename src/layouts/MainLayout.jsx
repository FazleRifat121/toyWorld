import { Outlet } from "react-router";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";

function MainLayout() {
	return (
		<div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-black animate-gradient-x text-white">
			<Navbar />
			{/* Add top padding for pages with fixed navbar */}
			<div className="pt-20">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}

export default MainLayout;
