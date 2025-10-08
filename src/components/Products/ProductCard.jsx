import { useNavigate } from "react-router";
import "./productcard.css";

function ProductCard({ item }) {
	const navigate = useNavigate();

	const goToDetails = () => {
		navigate(`/product/${item.id}`);
	};

	return (
		<div
			className="book w-70 rounded-lg overflow-hidden bg-gray-900 shadow-lg p-4 flex flex-col items-center relative "
			onClick={goToDetails}
		>
			{/* Image */}
			<img
				src={item.img}
				alt={item.title}
				className="w-full h-48 object-cover rounded ml-5"
			/>
			{/* Title */}
			<h2 className="text-xl font-bold text-cyan-400 mt-2 ml-5">
				{item.title}
			</h2>
			{/* Existing hover cover */}
			<div className="cover">
				<img
					src={item.img}
					alt={item.title}
					className="h-full w-full object-cover"
				/>
			</div>
		</div>
	);
}

export default ProductCard;
