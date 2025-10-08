import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
// import ProductCard from "./ProductCard";
import { X, Volume2, VolumeX, Maximize2 } from "lucide-react";
import gsap from "gsap";
// import Navbar from "../Nav/Navbar";
// import Footer from "../Footer/Footer";

/**
 * ProductDetails.jsx
 * - Builds on your previous code
 * - Adds cyan neon lines + floating particles + small parallax
 * - Animations are handled by GSAP (timeline + repeat)
 */

function ProductDetails({ addToCart, user }) {
	const { id } = useParams();
	const navigate = useNavigate();

	const [productData, setProductData] = useState(null);
	const [mainImage, setMainImage] = useState(null);
	const [fade, setFade] = useState(true);
	const [showVideoAd, setShowVideoAd] = useState(true);
	const [mutedAd, setMutedAd] = useState(true);
	const [products, setProducts] = useState([]);

	const videoRef = useRef(null);
	const titleRef = useRef(null);
	const imageRef = useRef(null);
	const descRef = useRef(null);
	const priceRef = useRef(null);
	const btnRef = useRef(null);

	// background refs
	const bgRef = useRef(null);
	// const linesRef = useRef([]);
	// const particlesRef = useRef([]);

	// Fetch products from public/products.json
	useEffect(() => {
		const loadProducts = async () => {
			try {
				const response = await fetch("/products.json");
				if (!response.ok) throw new Error("Failed to load product data");
				const data = await response.json();
				setProducts(data);
			} catch (error) {
				console.error(error);
			}
		};
		loadProducts();
	}, []);

	// select product
	useEffect(() => {
		if (products.length > 0) {
			const found = products.find((p) => p.id === parseInt(id));
			setProductData(found || null);
			if (found?.image?.length > 0) setMainImage(found.image[0]);
		}
	}, [id, products]);

	// main GSAP entrance
	useEffect(() => {
		if (productData) {
			const tl = gsap.timeline();
			tl.from(titleRef.current, {
				opacity: 0,
				y: -40,
				duration: 0.8,
				ease: "power3.out",
			})
				.from(
					imageRef.current,
					{ opacity: 0, y: 50, duration: 0.8, ease: "power3.out" },
					"-=0.4"
				)
				.from(descRef.current, { opacity: 0, y: 30, duration: 0.7 }, "-=0.5")
				.from(
					priceRef.current,
					{ opacity: 0, scale: 0.95, duration: 0.6 },
					"-=0.4"
				)
				.from(btnRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");
			return () => tl.kill();
		}
	}, [productData]);

	// background neon animation init (lines + particles + parallax)
	useEffect(() => {
		// create GSAP timeline for lines and particles
		const ctx = gsap.context(() => {
			// animate neon lines: move horizontally in alternating directions
			gsap.utils.toArray(".neon-line").forEach((el, idx) => {
				// const speed = 30 + idx * 10; // differentiate speeds
				// continuous subtle horizontal drift + opacity pulse
				gsap.to(el, {
					xPercent: idx % 2 === 0 ? 20 : -20,
					duration: 6 + idx,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
					force3D: true,
				});
				gsap.to(el, {
					opacity: 0.6,
					duration: 2 + (idx % 3),
					yoyo: true,
					repeat: -1,
					ease: "sine.inOut",
				});
			});

			// animate particles: float, scale and fade
			gsap.utils.toArray(".neon-particle").forEach((p, i) => {
				const dur = 4 + (i % 5);
				const delay = (i % 7) * 0.15;
				gsap.to(p, {
					y: `+=${10 + (i % 3) * 6}`,
					x: `+=${(i % 3) * 6 - 3}`,
					opacity: 0.7,
					duration: dur,
					ease: "sine.inOut",
					repeat: -1,
					yoyo: true,
					delay,
					force3D: true,
				});
				gsap.to(p, {
					scale: 0.4 + (i % 3) * 0.2,
					duration: dur / 2,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
					delay,
				});
			});

			// small parallax on mouse move
			const handleMove = (e) => {
				const rect = bgRef.current.getBoundingClientRect();
				const cx = rect.left + rect.width / 2;
				const cy = rect.top + rect.height / 2;
				const dx = (e.clientX - cx) / rect.width; // -0.5 .. 0.5
				const dy = (e.clientY - cy) / rect.height;
				// move background slightly
				gsap.to(".neon-line", {
					x: `+=${dx * 6}`,
					y: `+=${dy * 6}`,
					duration: 0.6,
					ease: "power3.out",
				});
				gsap.to(".neon-particle", {
					x: `+=${dx * 12}`,
					y: `+=${dy * 12}`,
					duration: 0.8,
					ease: "power3.out",
				});
			};
			window.addEventListener("mousemove", handleMove);

			// cleanup
			return () => {
				window.removeEventListener("mousemove", handleMove);
			};
		});

		return () => ctx.revert();
	}, []); // run once

	const handleThumbnailClick = (img) => {
		setFade(false);
		setTimeout(() => {
			setMainImage(img);
			setFade(true);
		}, 200);
	};

	const handleAddToCart = () => {
		if (!user) return alert("Please log in to add items to cart!");
		addToCart(productData.id);
	};

	const handleBuyNow = () => {
		if (!user) return alert("Please log in to continue checkout!");
		addToCart(productData.id);
		navigate("/cart");
	};

	if (!productData)
		return (
			<div className="min-h-screen flex items-center justify-center bg-black text-white text-3xl animate-pulse">
				Loading Product...
			</div>
		);

	// build some particles and lines
	const LINE_COUNT = 6;
	const PARTICLE_COUNT = 28;
	const lines = Array.from({ length: LINE_COUNT });
	const particles = Array.from({ length: PARTICLE_COUNT });

	return (
		<>
			{/* <Navbar /> */}

			<div className="min-h-screen p-8 relative text-white overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
				{/* --- Neon animated background (cyan-only) --- */}
				<div ref={bgRef} className="absolute inset-0 -z-10 pointer-events-none">
					{/* slow moving blurred cyan haze */}
					<div
						className="absolute inset-0 -z-20"
						style={{ filter: "blur(40px)", opacity: 0.55 }}
					>
						<div className="w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.10),transparent_60%)]"></div>
					</div>

					{/* neon lines layer */}
					<div className="absolute inset-0 -z-10">
						{lines.map((_, i) => (
							<div
								key={i}
								className="neon-line absolute left-[-10%] right-[-10%] pointer-events-none"
								style={{
									top: `${5 + i * 14}%`,
									height: `${1 + (i % 2) * 1.2}px`,
									background:
										"linear-gradient(90deg, rgba(0,255,255,0) 0%, rgba(0,255,255,0.12) 20%, rgba(0,255,255,0.3) 50%, rgba(0,255,255,0.12) 80%, rgba(0,255,255,0) 100%)",
									mixBlendMode: "screen",
									transform: "translateZ(0)",
									filter: "blur(0.6px)",
								}}
							/>
						))}
					</div>

					{/* particle dots */}
					<div className="absolute inset-0 -z-9">
						{particles.map((_, i) => {
							// random starting positions
							const left = Math.round((i * 73) % 100);
							const top = Math.round((i * 37) % 100);
							const size = 2 + (i % 4);
							return (
								<div
									key={i}
									className="neon-particle rounded-full pointer-events-none"
									style={{
										position: "absolute",
										left: `${left}%`,
										top: `${top}%`,
										width: `${size}px`,
										height: `${size}px`,
										background: "rgba(0,255,255,0.9)",
										boxShadow:
											"0 0 8px rgba(0,255,255,0.9), 0 0 14px rgba(0,255,255,0.6)",
										opacity: 0.6,
										transform: "translateZ(0)",
										willChange: "transform, opacity",
										mixBlendMode: "screen",
									}}
								/>
							);
						})}
					</div>
				</div>

				{/* CONTENT */}
				<div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
					{/* LEFT SIDE - Product Images */}
					<div className="space-y-4">
						<div
							ref={imageRef}
							className={`rounded-xl overflow-hidden transition-opacity duration-500 ${
								fade ? "opacity-100" : "opacity-0"
							}`}
						>
							<img
								src={mainImage}
								alt={productData.title}
								className="w-full h-96 object-cover rounded-xl shadow-[0_0_30px_#00ffff70]"
							/>
						</div>

						{/* Thumbnails */}
						{productData.image?.length > 1 && (
							<div className="grid grid-cols-4 gap-4">
								{productData.image.map((img, i) => (
									<div
										key={i}
										onClick={() => handleThumbnailClick(img)}
										className="cursor-pointer rounded-lg overflow-hidden border-2 border-gray-700 hover:border-cyan-400 transition"
									>
										<img
											src={img}
											alt={productData.title}
											className="w-full h-24 object-cover"
										/>
									</div>
								))}
							</div>
						)}
					</div>

					{/* RIGHT SIDE - Product Details */}
					<div className="flex flex-col justify-start space-y-6">
						<h1
							ref={titleRef}
							className="text-5xl font-extrabold text-cyan-400 drop-shadow-[0_0_25px_#00ffff] hover:drop-shadow-[0_0_40px_#00ffff] transition-all duration-500"
						>
							{productData.title}
						</h1>

						<p
							ref={descRef}
							className="text-lg text-gray-300 leading-relaxed max-w-lg"
						>
							{productData.description}
						</p>

						<p
							ref={priceRef}
							className="text-3xl font-bold text-white drop-shadow-[0_0_15px_#00ffff]"
						>
							${productData.offerPrice ?? productData.price}{" "}
							{productData.offerPrice && (
								<span className="line-through text-gray-500 ml-2">
									${productData.price}
								</span>
							)}
						</p>

						<div ref={btnRef} className="flex gap-4">
							<button
								onClick={handleAddToCart}
								className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:shadow-[0_0_20px_#00ffff] transition"
							>
								Add to Cart
							</button>
							<button
								onClick={handleBuyNow}
								className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg shadow-lg hover:shadow-[0_0_20px_#00ffff] transition"
							>
								Buy Now
							</button>
						</div>
					</div>
				</div>

				{/* Floating Video Ad */}
				{showVideoAd && productData.video && (
					<div className="fixed bottom-5 right-5 w-40 h-64 bg-black rounded-xl overflow-hidden shadow-lg z-50 border border-cyan-400/30">
						<video
							ref={videoRef}
							src={productData.video}
							autoPlay
							loop
							muted={mutedAd}
							className="w-full h-full object-cover"
						/>
						<div className="absolute top-1 right-1 flex gap-2">
							<button
								onClick={() => setMutedAd(!mutedAd)}
								className="bg-black/60 p-1 rounded text-white hover:text-cyan-400"
							>
								{mutedAd ? <VolumeX size={18} /> : <Volume2 size={18} />}
							</button>
							<button
								onClick={() => {
									if (videoRef.current) {
										if (!document.fullscreenElement) {
											videoRef.current.requestFullscreen();
										} else {
											document.exitFullscreen();
										}
									}
								}}
								className="bg-black/60 p-1 rounded text-white hover:text-cyan-400"
							>
								<Maximize2 size={18} />
							</button>
							<button
								onClick={() => setShowVideoAd(false)}
								className="bg-black/60 p-1 rounded text-white hover:text-cyan-400"
							>
								<X size={18} />
							</button>
						</div>
					</div>
				)}

				{/* <Footer /> */}

				{/* small local styles to improve crispness on backgrounds */}
				<style>{`
          /* reduce pointer-events on animated background (already none) */
          .neon-line, .neon-particle { will-change: transform, opacity; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
          /* slightly soften the large cyan blur on small screens */
          @media (max-width: 640px) {
            .neon-line { opacity: 0.5 !important; }
          }
        `}</style>
			</div>
		</>
	);
}

export default ProductDetails;
