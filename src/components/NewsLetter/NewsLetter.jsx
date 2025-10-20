import { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
	const [email, setEmail] = useState("");

	const handleSubscribe = (e) => {
		e.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			toast.error("Please enter a valid email!");
			return;
		}

		toast.success("Subscribed successfully!");
		setEmail("");
	};

	return (
		<div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 sm:p-10 rounded-xl text-white text-center max-w-4xl mx-auto mt-12 sm:mt-16">
			<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
				Subscribe to Our Newsletter
			</h2>
			<p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
				Get the latest products and updates directly to your inbox.
			</p>

			<form
				onSubmit={handleSubscribe}
				className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
			>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="p-3 sm:p-4 rounded-lg flex-1 text-black focus:outline-none bg-white text-sm sm:text-base"
					required
				/>
				<button
					type="submit"
					className="px-5 sm:px-6 py-2 sm:py-3 bg-cyan-500 text-black font-bold rounded-lg glowing-button transition-all text-sm sm:text-base"
				>
					Subscribe
				</button>
			</form>

			<style>{`
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
};

export default Newsletter;
