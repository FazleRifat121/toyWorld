import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { Toaster } from "react-hot-toast";

function App() {
	const [cart, setCart] = useState([]);

	const addToCart = (product) => {
		setCart((prev) => {
			const existing = prev.find((item) => item.id === product.id);
			if (existing) {
				return prev.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				return [...prev, { ...product, quantity: 1 }];
			}
		});
	};

	return (
		<>
			<Toaster position="top-right" reverseOrder={false} />
			<RouterProvider router={router({ addToCart, cart, setCart })} />
		</>
	);
}

export default App;
