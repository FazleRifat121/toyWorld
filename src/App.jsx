import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { Toaster } from "react-hot-toast";

function App() {
	const [cart, setCart] = useState(() => {
		const stored = localStorage.getItem("cart");
		return stored ? JSON.parse(stored) : [];
	});

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

	return (
		<>
			<div className="orbitron overflow-x-hidden">
				<Toaster position="top-center" reverseOrder={false} />
				<RouterProvider router={router({ addToCart, cart, setCart })} />
			</div>
		</>
	);
}

export default App;
