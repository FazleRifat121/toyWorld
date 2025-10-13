import { useNavigate } from "react-router";
import "../Products/productcard.css";

export default function ProductCard({ item }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/product/${item.id}`);
	};

	return (
		<div className="flex flex-col items-center gap-2">
			<div
				className="card text-center group cursor-pointer"
				style={{
					"--hover-bg": `url(${item.img})`,
				}}
				onClick={handleClick}
			>
				<h2 className="lg:card-title opacity-0 group-hover:opacity-100 ">
					{item.title}
				</h2>
			</div>
			<h2 className="text-lg lg:opacity-0 font-bold card-title text-center">
				{item.title}
			</h2>
		</div>
	);
}
