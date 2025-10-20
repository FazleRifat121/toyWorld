"use client";
import React, { useEffect, useState } from "react";
import {
	SignedIn,
	SignedOut,
	RedirectToSignIn,
	useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const MyOrders = () => {
	const { user } = useUser();
	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);

	// Load orders from localStorage
	useEffect(() => {
		if (user) {
			const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
			const userOrders = savedOrders.filter((o) => o.userId === user.id);
			setOrders(userOrders);
		}
	}, [user]);

	// Cancel order
	const cancelOrder = (orderId) => {
		const updatedOrders = orders.filter((o) => o.id !== orderId);
		setOrders(updatedOrders);

		// Update in localStorage
		const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
		const remainingOrders = allOrders.filter((o) => o.id !== orderId);
		localStorage.setItem("orders", JSON.stringify(remainingOrders));

		toast.success("Order cancelled!");
	};

	// Navigate to Shop if no orders
	if (!orders.length)
		return (
			<div className="min-h-screen p-8 text-white">
				<p>You have no orders yet.</p>
				<button
					onClick={() => navigate("/shop")}
					className="mt-4 px-6 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400"
				>
					Go to Shop
				</button>
			</div>
		);

	return (
		<div className="min-h-screen p-8 text-white">
			<h1 className="text-3xl font-bold mb-6">My Orders</h1>
			<div className="space-y-6">
				{orders.map((order) => {
					const total = order.items
						.reduce(
							(acc, item) =>
								acc + (item.offerPrice ?? item.price) * item.quantity,
							0
						)
						.toFixed(2);
					return (
						<div key={order.id} className="bg-gray-800 p-4 rounded-lg">
							<h2 className="text-xl font-semibold mb-2">
								Order ID: {order.id}
							</h2>
							<div className="space-y-2">
								{order.items.map((item) => (
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
											{(
												(item.offerPrice ?? item.price) * item.quantity
											).toFixed(2)}
										</span>
									</div>
								))}
							</div>
							<p className="mt-2 font-bold text-lg">Total: ${total}</p>
							<button
								onClick={() => cancelOrder(order.id)}
								className="mt-2 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
							>
								Cancel Order
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const ProtectedMyOrders = () => (
	<>
		<SignedIn>
			<MyOrders />
		</SignedIn>
		<SignedOut>
			<RedirectToSignIn />
		</SignedOut>
	</>
);

export default ProtectedMyOrders;
