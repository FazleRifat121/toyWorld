import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

function ProductDetails({ addToCart }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await fetch("/products.json");
				const data = await res.json();
				const found = data.find((p) => p.id === parseInt(id));
				setProduct(found || null);
			} catch (err) {
				console.error(err);
			}
		};
		fetchProduct();
	}, [id]);

	if (!product) {
		return (
			<div className="min-h-screen flex items-center justify-center text-white text-2xl">
				Loading Product...
			</div>
		);
	}

	const handleAddToCart = () => {
		addToCart(product.id);
	};

	return (
		<div className="min-h-screen p-8 text-white">
			<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
				{/* Product Image */}
				<div>
					<img
						src={product.img}
						alt={product.title}
						className="w-full h-[400px] object-cover rounded-lg shadow-lg"
					/>
				</div>

				{/* Product Info */}
				<div className="flex flex-col justify-start gap-4">
					{/* Title always glowing */}
					<h1 className="text-4xl font-bold text-cyan-400 glowing-text">
						{product.title}
					</h1>

					<p className="text-gray-300">{product.description}</p>
					<p className="text-2xl font-bold">
						${product.offerPrice ?? product.price}{" "}
						{product.offerPrice && (
							<span className="line-through text-gray-500 ml-2">
								${product.price}
							</span>
						)}
					</p>

					<div className="flex gap-4 mt-4">
						{/* Add to Cart glowing on hover */}
						<button
							onClick={handleAddToCart}
							className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg glowing-button"
						>
							Add to Cart
						</button>
						<button
							onClick={() => navigate("/cart")}
							className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg"
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>

			{/* Custom styles for glowing */}
			<style>{`
       
      
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

export default ProductDetails;
