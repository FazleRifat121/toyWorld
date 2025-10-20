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
		<div className="min-h-screen p-4 sm:p-8 text-white">
			<h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
				Your Cart
			</h1>

			{cart.length === 0 ? (
				<p className="text-center text-lg">Your cart is empty.</p>
			) : (
				<>
					<div className="space-y-4">
						{cart.map((item) => (
							<div
								key={item.id}
								className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-800 rounded-lg gap-4"
							>
								<div className="flex items-center gap-4 w-full sm:w-auto">
									<img
										src={Array.isArray(item.img) ? item.img[0] : item.img}
										alt={item.title}
										className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
									/>
									<div className="flex-1 min-w-0">
										<h2 className="font-semibold text-lg sm:text-xl truncate">
											{item.title}
										</h2>
										<p className="text-sm sm:text-base">
											${(item.offerPrice ?? item.price).toFixed(2)} x{" "}
											{item.quantity} = $
											{(
												(item.offerPrice ?? item.price) * item.quantity
											).toFixed(2)}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2 mt-2 sm:mt-0">
									<button
										onClick={() => decreaseQty(item.id)}
										className="px-2 py-1 sm:px-3 sm:py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
									>
										-
									</button>
									<span className="px-2">{item.quantity}</span>
									<button
										onClick={() => increaseQty(item.id)}
										className="px-2 py-1 sm:px-3 sm:py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
									>
										+
									</button>
									<button
										onClick={() => removeItem(item.id)}
										className="ml-2 sm:ml-4 px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
									>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
						<p className="text-xl sm:text-2xl font-bold">Total: ${total}</p>
						<div className="flex gap-4 flex-col sm:flex-row w-full sm:w-auto">
							<button
								onClick={() => navigate("/checkout")}
								className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
							>
								Checkout
							</button>
							<button
								onClick={() => navigate("/shop")}
								className="w-full sm:w-auto px-6 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
							>
								Continue Shopping
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
