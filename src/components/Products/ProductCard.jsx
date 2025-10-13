import { useNavigate } from "react-router";
import "../Products/productcard.css";

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
			<h2 className="lg:card-title lg:opacity-0 group-hover:opacity-100 text-cyan-400">
				{item.title}
			</h2>
		</div>
	);
}
