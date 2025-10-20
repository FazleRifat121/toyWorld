"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
	useUser,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
} from "@clerk/clerk-react";
import toast from "react-hot-toast";

const Checkout = ({ cartItems, setCart }) => {
	const navigate = useNavigate();
	const { user } = useUser(); // Get current signed-in user

	// Load saved checkout data from localStorage
	const savedData = JSON.parse(localStorage.getItem("checkoutData")) || {
		name: "",
		email: "",
		address: "",
		payment: "cod",
	};

	const [checkoutData, setCheckoutData] = useState(savedData);

	useEffect(() => {
		// Save form data to localStorage whenever it changes
		localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
	}, [checkoutData]);

	if (!cartItems || cartItems.length === 0) {
		return (
			<div className="min-h-screen p-8 text-white">
				<p>Your cart is empty. Go back to shop to add products.</p>
				<button
					onClick={() => navigate("/shop")}
					className="mt-4 px-6 py-2 bg-gray-700 rounded hover:bg-gray-600"
				>
					Go to Shop
				</button>
			</div>
		);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCheckoutData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCheckout = (e) => {
		e.preventDefault();
		if (!checkoutData.name || !checkoutData.email || !checkoutData.address) {
			toast.error("Please fill all required fields!");
			return;
		}

		// Save order
		const newOrder = {
			id: Date.now().toString(),
			userId: user.id, // Clerk user ID
			items: cartItems,
			date: new Date().toISOString(),
		};

		const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
		localStorage.setItem(
			"orders",
			JSON.stringify([...existingOrders, newOrder])
		);

		toast.success("Order placed successfully!");
		setCart([]); // Clear cart
		localStorage.removeItem("checkoutData"); // Clear saved form
		navigate("/my-orders"); // Redirect to home
	};

	const total = cartItems
		.reduce(
			(acc, item) => acc + (item.offerPrice ?? item.price) * item.quantity,
			0
		)
		.toFixed(2);

	return (
		<div className="min-h-screen p-8 text-white">
			<h1 className="text-3xl font-bold mb-6">Checkout</h1>

			<div className="grid md:grid-cols-2 gap-8">
				{/* Cart Summary */}
				<div className="bg-gray-800 p-4 rounded-lg">
					<h2 className="text-xl font-bold mb-4">Order Summary</h2>
					<div className="space-y-4">
						{cartItems.map((item) => (
							<div
								key={item.id}
								className="flex justify-between items-center gap-4"
							>
								<img
									src={Array.isArray(item.img) ? item.img[0] : item.img}
									alt={item.title}
									className="w-16 h-16 object-cover rounded"
								/>
								<div className="flex-1">
									<p className="font-semibold">{item.title}</p>
									<p>
										{item.quantity} x $
										{(item.offerPrice ?? item.price).toFixed(2)}
									</p>
								</div>
								<span>
									$
									{((item.offerPrice ?? item.price) * item.quantity).toFixed(2)}
								</span>
							</div>
						))}
					</div>
					<p className="mt-4 font-bold text-lg">Total: ${total}</p>
				</div>

				{/* Checkout Form */}
				<div className="bg-gray-800 p-6 rounded-lg">
					<h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
					<form onSubmit={handleCheckout} className="space-y-4">
						<div>
							<label className="block mb-1">Name</label>
							<input
								type="text"
								name="name"
								value={checkoutData.name}
								onChange={handleChange}
								className="w-full p-2 rounded bg-gray-700 text-white"
								required
							/>
						</div>
						<div>
							<label className="block mb-1">Email</label>
							<input
								type="email"
								name="email"
								value={checkoutData.email}
								onChange={handleChange}
								className="w-full p-2 rounded bg-gray-700 text-white"
								required
							/>
						</div>
						<div>
							<label className="block mb-1">Address</label>
							<textarea
								name="address"
								value={checkoutData.address}
								onChange={handleChange}
								className="w-full p-2 rounded bg-gray-700 text-white"
								required
							/>
						</div>
						<div>
							<label className="block mb-1">Payment Method</label>
							<select
								name="payment"
								value={checkoutData.payment}
								onChange={handleChange}
								className="w-full p-2 rounded bg-gray-700 text-white"
							>
								<option value="cod">Cash on Delivery</option>
								<option value="card">Credit/Debit Card</option>
							</select>
						</div>
						<button
							type="submit"
							className="w-full mt-2 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
						>
							Place Order
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

// Protect the route
const ProtectedCheckout = ({ cartItems, setCart }) => (
	<>
		<SignedIn>
			<Checkout cartItems={cartItems} setCart={setCart} />
		</SignedIn>
		<SignedOut>
			<RedirectToSignIn />
		</SignedOut>
	</>
);

export default ProtectedCheckout;
