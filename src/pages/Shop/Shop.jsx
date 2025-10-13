import { useEffect, useState } from "react";
import ProductCard from "../../components/Products/ProductCard";

function Shop() {
	const [items, setItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;

	useEffect(() => {
		fetch("./products.json")
			.then((response) => response.json())
			.then((data) => setItems(data));
	}, []);

	// Pagination logic
	const totalPages = Math.ceil(items.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

	const handlePageChange = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" }); // smooth scroll up
	};

	return (
		<div>
			<div className="mt-20">
				<h1 className="text-3xl font-bold text-center mb-8">Shop</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10 p-6 max-w-5xl mx-auto justify-items-center">
					{currentItems.map((item) => (
						<ProductCard key={item.id} item={item} />
					))}
				</div>

				{/* Pagination */}
				<div className="join flex justify-center items-center mt-8 mb-10">
					{[...Array(totalPages)].map((_, index) => (
						<input
							key={index}
							className={`join-item btn btn-square ${
								currentPage === index + 1
									? " bg-cyan-500 border border-cyan-500"
									: ""
							}`}
							type="radio"
							name="options"
							aria-label={index + 1}
							checked={currentPage === index + 1}
							onChange={() => handlePageChange(index + 1)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Shop;
