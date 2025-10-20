import { Link } from "react-router";
import ProductsCarousel from "./ProductsCarousel";

function Products() {
	return (
		<div className="mt-20 ">
			<div>
				<ProductsCarousel />
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
