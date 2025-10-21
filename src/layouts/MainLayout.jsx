import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import ToyWorldIntro from "../components/ToyWorldIntro/ToyWorldIntro";

function MainLayout() {
	const [showIntro, setShowIntro] = useState(true);

	return (
		<div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-black animate-gradient-x text-white">
			{showIntro ? (
				<ToyWorldIntro onFinish={() => setShowIntro(false)} />
			) : (
				<>
					<Navbar />
					<Outlet />
					<Footer />
				</>
			)}
		</div>
	);
}

export default MainLayout;
