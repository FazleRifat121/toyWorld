import { useEffect, useState } from "react";
import ProductCard from "../../components/Products/ProductCard";
import img1 from "../../assets/category/all.jpg";
import img2 from "../../assets/category/robot.jpg";
import img3 from "../../assets/category/cars.jpg";
import img4 from "../../assets/category/plush.jpg";
import img6 from "../../assets/category/action.jpg";
import img7 from "../../assets/category/blocks.webp";
import img8 from "../../assets/category/puzzle.webp";
import img9 from "../../assets/category/stem.webp";

function Shop() {
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [category, setCategory] = useState("All");
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

	// Filter + Sort
	useEffect(() => {
		let updated = [...items];

		if (category !== "All") {
			updated = updated.filter((item) => item.category === category);
		}

		if (sortOption === "price-low") {
			updated.sort((a, b) => a.price - b.price);
		} else if (sortOption === "price-high") {
			updated.sort((a, b) => b.price - a.price);
		} else if (sortOption === "newest") {
			updated.sort((a, b) => b.id - a.id);
		}

		setFilteredItems(updated);
		setCurrentPage(1);
	}, [category, sortOption, items]);

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

	// ✅ Match real product categories
	const categoryData = [
		{ name: "All", img: img1 },
		{ name: "Robotics", img: img2 },
		{ name: "Vehicles", img: img3 },
		{ name: "Action Figures", img: img6 },
		{ name: "Building", img: img7 },
		{ name: "Plush", img: img4 },
		{ name: "Puzzles", img: img8 },
		{ name: "Stem", img: img9 },
	];

	return (
		<div className="mt-20 max-w-7xl mx-auto px-4">
			<h1 className="text-3xl font-bold text-center mb-8 text-white">Shop</h1>

			{/* Category Avatar Filter */}
			<div className="flex flex-wrap justify-center gap-6 mb-10">
				{categoryData.map((cat) => (
					<div
						key={cat.name}
						onClick={() => setCategory(cat.name)}
						className={`flex flex-col items-center cursor-pointer transition-transform duration-300 ${
							category === cat.name ? "scale-110" : "hover:scale-105"
						}`}
					>
						<div
							className={`w-20 h-20 rounded-full border-2 flex items-center justify-center overflow-hidden ${
								category === cat.name
									? "border-cyan-400 shadow-glow"
									: "border-gray-600"
							}`}
						>
							<img
								src={cat.img}
								alt={cat.name}
								className="object-cover w-full h-full"
							/>
						</div>
						<p
							className={`mt-2 text-sm uppercase tracking-wide ${
								category === cat.name
									? "text-cyan-400 font-semibold"
									: "text-gray-300"
							}`}
						>
							{cat.name}
						</p>
					</div>
				))}
			</div>

			{/* Sort Options */}
			<div className="flex justify-end mb-8">
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

			{/* Product Grid */}
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
