import { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";

export default function RelatedProducts({ currentProductId, category }) {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch("/products.json");
				const data = await res.json();
				// Filter products by same category and exclude current product
				const related = data
					.filter(
						(p) =>
							p.category === category && p.id !== parseInt(currentProductId)
					)
					.slice(0, 4); // Limit to 4 items
				setProducts(related);
			} catch (err) {
				console.error(err);
			}
		};
		fetchProducts();
	}, [currentProductId, category]);

	if (!products.length) return null;

	return (
		<div className="max-w-5xl mx-auto mt-16">
			<h2 className="text-2xl font-bold mb-6">Related Products</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				{products.map((item) => (
					<ProductCard key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}
