import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
function OrderPlaced() {
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden text-white">
			{/* Animated background shapes */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden">
				<motion.div
					animate={{ y: ["-100%", "100%"] }}
					transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
					className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl top-[-50%] left-[-10%]"
				/>
				<motion.div
					animate={{ x: ["100%", "-100%"] }}
					transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
					className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl top-[20%] left-[50%]"
				/>
			</div>

			{/* Main content */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1 }}
				className="relative z-10 text-center"
			>
				<h1 className="text-6xl md:text-8xl font-extrabold text-cyan-400 neon-text mb-6">
					ORDER PLACED!
				</h1>
				<p className="text-gray-300 text-lg md:text-xl mb-8">
					Your order has been successfully placed. Prepare for your delivery
					quest!
				</p>

				{/* Animated "Back to Shop" button */}
				<motion.button
					whileHover={{ scale: 1.1, textShadow: "0px 0px 8px #0ff" }}
					whileTap={{ scale: 0.95 }}
					onClick={() => navigate("/my-orders")}
					className="px-8 py-4 bg-cyan-500 font-bold rounded-lg text-black text-lg hover:bg-cyan-600 shadow-lg glowing-button"
				>
					My Orders
				</motion.button>
			</motion.div>

			{/* Neon text style */}
			<style>{`
        .neon-text {
          text-shadow:
            0 0 5px #0ff,
            0 0 10px #0ff,
            0 0 20px #0ff,
            0 0 40px #0ff;
          animation: glowTitle 2s infinite alternate;
        }

        @keyframes glowTitle {
          0% { text-shadow: 0 0 5px #0ff,0 0 10px #0ff,0 0 20px #0ff,0 0 40px #0ff; }
          50% { text-shadow: 0 0 10px #0ff,0 0 20px #0ff,0 0 30px #0ff,0 0 60px #0ff; }
          100% { text-shadow: 0 0 5px #0ff,0 0 10px #0ff,0 0 20px #0ff,0 0 40px #0ff; }
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

export default OrderPlaced;
