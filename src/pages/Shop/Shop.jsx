import { useEffect, useState } from "react";
import ProductCard from "../../components/Products/ProductCard";

function Shop() {
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [category, setCategory] = useState("all");
	const [sortOption, setSortOption] = useState("default");
	const itemsPerPage = 12;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		fetch("./products.json")
			.then((res) => res.json())
			.then((data) => {
				setItems(data);
				setFilteredItems(data);
			});
	}, []);

	// Filter and sort items
	useEffect(() => {
		let updated = [...items];

		// Filter by category
		if (category !== "all") {
			updated = updated.filter((item) => item.category === category);
		}

		// Sort
		if (sortOption === "price-low") {
			updated.sort((a, b) => a.price - b.price);
		} else if (sortOption === "price-high") {
			updated.sort((a, b) => b.price - a.price);
		} else if (sortOption === "newest") {
			updated.sort((a, b) => b.id - a.id);
		}

		setFilteredItems(updated);
		setCurrentPage(1); // Reset to first page
	}, [category, sortOption, items]);

	// Pagination
	const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentItems = filteredItems.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	const handlePageChange = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// Get unique categories
	const categories = ["all", ...new Set(items.map((i) => i.category))];

	return (
		<div className="mt-20 max-w-7xl mx-auto px-4">
			<h1 className="text-3xl font-bold text-center mb-8">Shop</h1>

			{/* Filters */}
			<div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
				{/* Category Filter */}
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="p-2 rounded-lg bg-gray-800 text-white"
				>
					{categories.map((cat) => (
						<option key={cat} value={cat}>
							{cat.toUpperCase()}
						</option>
					))}
				</select>

				{/* Sort */}
				<select
					value={sortOption}
					onChange={(e) => setSortOption(e.target.value)}
					className="p-2 rounded-lg bg-gray-800 text-white"
				>
					<option value="default">Default</option>
					<option value="price-low">Price: Low to High</option>
					<option value="price-high">Price: High to Low</option>
					<option value="newest">Newest</option>
				</select>
			</div>

			{/* Products Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10">
				{currentItems.map((item) => (
					<ProductCard key={item.id} item={item} />
				))}
			</div>

			{/* Pagination */}
			<div className="flex justify-center items-center mt-8 mb-10 gap-2">
				{[...Array(totalPages)].map((_, index) => (
					<button
						key={index}
						className={`px-3 py-1 rounded-lg border border-cyan-500 text-cyan-500 transition-all ${
							currentPage === index + 1
								? "bg-cyan-500 text-black shadow-glow"
								: "hover:bg-cyan-500 hover:text-black"
						}`}
						onClick={() => handlePageChange(index + 1)}
					>
						{index + 1}
					</button>
				))}
			</div>

			<style>{`
				.shadow-glow {
					box-shadow:
						0 0 5px #0ff,
						0 0 10px #0ff,
						0 0 20px #0ff,
						0 0 40px #0ff;
				}
			`}</style>
		</div>
	);
}

export default Shop;
