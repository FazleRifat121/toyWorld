import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { Toaster } from "react-hot-toast";
import { FaArrowUp } from "react-icons/fa";

function App() {
	const [cart, setCart] = useState(() => {
		const stored = localStorage.getItem("cart");
		return stored ? JSON.parse(stored) : [];
	});

	const [showScroll, setShowScroll] = useState(false);

	const addToCart = (product) => {
		setCart((prev) => {
			const existing = prev.find((item) => item.id === product.id);
			let newCart;
			if (existing) {
				newCart = prev.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				newCart = [...prev, { ...product, quantity: 1 }];
			}
			localStorage.setItem("cart", JSON.stringify(newCart));
			return newCart;
		});
	};

	// Show arrow when scrolling down
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) setShowScroll(true);
			else setShowScroll(false);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="orbitron overflow-x-hidden relative">
			<Toaster position="top-center" reverseOrder={false} />
			<RouterProvider router={router({ addToCart, cart, setCart })} />

			{/* Scroll to Top Button */}
			{showScroll && (
				<button
					onClick={scrollToTop}
					className="fixed bottom-6 right-6 z-50 bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-full shadow-lg shadow-cyan-500/40 transition-all duration-300 animate-fade-in glowing-button"
				>
					<FaArrowUp size={20} />
				</button>
			)}

			{/* Animation */}
			<style>{`
				@keyframes fadeIn {
					from { opacity: 0; transform: translateY(10px); }
					to { opacity: 1; transform: translateY(0); }
				}
				.animate-fade-in {
					animation: fadeIn 0.3s ease-in-out;
				}
				/* Button glow on hover */
				.glowing-button {
					transition: all 0.3s ease-in-out;
				}
				.glowing-button:hover {
					box-shadow:
						0 0 5px #0ff,
						0 0 10px #0ff,
						0 0 20px #0ff,
						0 0 40px #0ff;
					transform: scale(1.05);
				}
			`}</style>
		</div>
	);
}

export default App;
