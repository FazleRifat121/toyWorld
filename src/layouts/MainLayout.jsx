import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import ToyWorldIntro from "../components/ToyWorldIntro/ToyWorldIntro.jsx";
import { gsap } from "gsap";

function MainLayout() {
	const [showIntro, setShowIntro] = useState(true);
	const navbarRef = useRef(null);
	const outletRef = useRef(null);

	useEffect(() => {
		if (!showIntro) {
			// Animate Navbar from top
			gsap.from(navbarRef.current, {
				y: -150, // move above the screen
				opacity: 0,
				duration: 1,
				ease: "power3.out",
			});

			// Animate Outlet content from bottom
			gsap.from(outletRef.current, {
				y: 150,
				opacity: 0,
				duration: 1,
				delay: 0.2,
				ease: "power3.out",
			});
		}
	}, [showIntro]);

	return (
		<div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-black animate-gradient-x text-white relative">
			{showIntro ? (
				<ToyWorldIntro onFinish={() => setShowIntro(false)} />
			) : (
				<>
					<div
						ref={navbarRef}
						className="relative w-full z-50" // Ensure Navbar is visible
					>
						<Navbar />
					</div>

					<div ref={outletRef} className="relative z-40 mt-4">
						<Outlet />
					</div>

					{/* Footer stays in its own place */}
					<Footer />
				</>
			)}
		</div>
	);
}

export default MainLayout;
