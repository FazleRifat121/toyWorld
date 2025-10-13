import { useEffect, useState } from "react";
import { Link } from "react-router";
import ProductCard from "./ProductCard";

function Products() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch("/products.json")
			.then((response) => response.json())
			.then((data) => setItems(data.slice(0, 8))); // only show first 8 items
	}, []);

	return (
		<div className="mt-20">
			<h1 className="text-3xl font-bold text-center mb-8">Products</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10 p-6 max-w-5xl mx-auto justify-items-center">
				{items.map((item) => (
					<ProductCard key={item.id} item={item} />
				))}
			</div>

			{/* All Products Button */}
			<div className="flex justify-center mt-10 mb-16">
				<Link
					to="/shop"
					className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg glowing-button"
				>
					All Products
				</Link>
			</div>
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

export default Products;
