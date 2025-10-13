import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function Products() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch("/products.json")
			.then((response) => response.json())
			.then((data) => setItems(data));
	}, []);

	return (
		<div className="mt-20">
			<h1 className="text-3xl font-bold text-center mb-8">Products</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10 p-6 max-w-5xl mx-auto justify-items-center">
				{items.map((item) => (
					<ProductCard key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}

export default Products;
