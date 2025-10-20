import { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductsCarousel() {
	const [items, setItems] = useState([]);
	const [slidesToShow, setSlidesToShow] = useState(3);

	// ✅ Dynamically detect screen size and set slidesToShow
	useEffect(() => {
		const updateSlides = () => {
			if (window.innerWidth < 768) {
				setSlidesToShow(1);
			} else if (window.innerWidth < 1024) {
				setSlidesToShow(2);
			} else {
				setSlidesToShow(3);
			}
		};

		updateSlides(); // run on mount
		window.addEventListener("resize", updateSlides);
		return () => window.removeEventListener("resize", updateSlides);
	}, []);

	// ✅ Fetch products
	useEffect(() => {
		fetch("/products.json")
			.then((res) => res.json())
			.then((data) => setItems(data))
			.catch((err) => console.error("Error loading products:", err));
	}, []);

	// ✅ Use dynamically controlled slidesToShow
	const settings = {
		centerMode: slidesToShow > 1, // disable centerMode on small screens
		centerPadding: "0px",
		slidesToShow,
		infinite: true,
		speed: 600,
		autoplay: true,
		autoplaySpeed: 2500,
		arrows: false,
		cssEase: "ease-in-out",
	};

	return (
		<div className="mt-20 max-w-6xl mx-auto px-4">
			<h1 className="text-3xl font-bold text-center mb-8 text-white">
				Products
			</h1>

			<Slider {...settings} className="products-slider">
				{items.map((item) => (
					<div key={item.id} className="px-2">
						<ProductCard item={item} />
					</div>
				))}
			</Slider>

			<style>{`
        .products-slider .ProductCard {
          transform: scale(0.8) rotateY(0deg);
          transition: transform 0.6s ease-in-out;
          perspective: 1000px;
        }
        .products-slider .slick-center .ProductCard {
          transform: scale(1.2) rotateY(0deg);
        }
        .products-slider .slick-slide:not(.slick-center) .ProductCard {
          transform: scale(0.85) rotateY(-15deg);
        }
        .products-slider .slick-slide:hover .ProductCard {
          transform: scale(1.2) rotateY(0deg);
        }
      `}</style>
		</div>
	);
}

export default ProductsCarousel;
