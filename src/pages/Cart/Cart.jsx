import React from "react";
import { useNavigate } from "react-router";

const Cart = ({ cart = [], setCart }) => {
	const navigate = useNavigate();

	// Increase quantity
	const increaseQty = (id) => {
		setCart((prev) => {
			const updated = prev.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item
			);
			localStorage.setItem("cart", JSON.stringify(updated));
			return updated;
		});
	};

	// Decrease quantity
	const decreaseQty = (id) => {
		setCart((prev) => {
			const updated = prev.map((item) =>
				item.id === id && item.quantity > 1
					? { ...item, quantity: item.quantity - 1 }
					: item
			);
			localStorage.setItem("cart", JSON.stringify(updated));
			return updated;
		});
	};

	// Remove item
	const removeItem = (id) => {
		const updated = cart.filter((item) => item.id !== id);
		setCart(updated);
		localStorage.setItem("cart", JSON.stringify(updated));
	};

	const total = cart
		.reduce(
			(acc, item) => acc + (item.offerPrice ?? item.price) * item.quantity,
			0
		)
		.toFixed(2);

	return (
		<div className="min-h-screen p-8 text-white">
			<h1 className="text-3xl font-bold mb-6">Your Cart</h1>

			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<div className="space-y-4">
						{cart.map((item) => (
							<div
								key={item.id}
								className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
							>
								<div className="flex items-center gap-4">
									<img
										src={Array.isArray(item.img) ? item.img[0] : item.img}
										alt={item.title}
										className="w-16 h-16 object-cover rounded"
									/>
									<div>
										<h2 className="font-semibold text-lg">{item.title}</h2>
										<p>
											${(item.offerPrice ?? item.price).toFixed(2)} x{" "}
											{item.quantity} = $
											{(
												(item.offerPrice ?? item.price) * item.quantity
											).toFixed(2)}
										</p>
									</div>
								</div>
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
