import React from "react";
import { useNavigate } from "react-router";

const Cart = ({ cartItems = [], setCart }) => {
	const navigate = useNavigate();

	if (!setCart) {
		console.warn("setCart prop is missing!");
		return <p>Cart state not available.</p>;
	}

	// Increase quantity
	const increaseQty = (id) => {
		setCart((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item
			)
		);
	};

	// Decrease quantity
	const decreaseQty = (id) => {
		setCart((prev) =>
			prev.map((item) =>
				item.id === id && item.quantity > 1
					? { ...item, quantity: item.quantity - 1 }
					: item
			)
		);
	};

	// Remove item
	const removeItem = (id) => {
		setCart((prev) => prev.filter((item) => item.id !== id));
	};

	// Calculate total
	const total = cartItems
		.reduce((acc, item) => acc + item.price * item.quantity, 0)
		.toFixed(2);

	return (
		<div className="min-h-screen p-8 text-white">
			<h1 className="text-3xl font-bold mb-6">Your Cart</h1>

			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<div className="space-y-4">
						{cartItems.map((item) => (
							<div
								key={item.id}
								className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
							>
								{/* Product image + info */}
								<div className="flex items-center gap-4">
									<img
										src={item.img}
										alt={item.title}
										className="w-20 h-20 object-cover rounded-lg"
									/>
									<div>
										<h2 className="font-semibold text-lg">{item.title}</h2>
										<p>${item.price.toFixed(2)}</p>
									</div>
								</div>

								{/* Quantity and remove */}
								<div className="flex items-center gap-2">
									<button
										onClick={() => decreaseQty(item.id)}
										className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
									>
										-
									</button>
									<span>{item.quantity}</span>
									<button
										onClick={() => increaseQty(item.id)}
										className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
									>
										+
									</button>
									<button
										onClick={() => removeItem(item.id)}
										className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
									>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="mt-6 text-right">
						<p className="text-xl font-bold">Total: ${total}</p>
						<button
							onClick={() => navigate("/checkout")}
							className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
						>
							Checkout
						</button>
					</div>
				</>
			)}

			<button
				onClick={() => navigate("/shop")}
				className="mt-6 px-6 py-2 bg-gray-700 rounded hover:bg-gray-600"
			>
				Continue Shopping
			</button>
		</div>
	);
};

export default Cart;
