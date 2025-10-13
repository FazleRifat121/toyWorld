import { useNavigate } from "react-router";
import "./ProductCard.css";

export default function ProductCard({ item }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/product/${item.id}`);
	};

	return (
		<div
			className="card text-center group cursor-pointer"
			style={{
				"--hover-bg": `url(${item.img})`,
			}}
			onClick={handleClick}
		>
			<h2 className="lg:card-title lg:opacity-0 group-hover:opacity-100">
				{item.title}
			</h2>
		</div>
	);
}
