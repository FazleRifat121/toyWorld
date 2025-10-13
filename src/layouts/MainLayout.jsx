import { Outlet } from "react-router";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";

function MainLayout() {
	return (
		<div>
			<div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-black animate-gradient-x text-white">
				<Navbar />
				<Outlet />
				<Footer />
			</div>
		</div>
	);
}

export default MainLayout;
