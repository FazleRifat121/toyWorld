import { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";
import Services from "../../components/Services/Services";

function Home() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div>
			<Hero />
			<Products />
			<Services />
		</div>
	);
}

export default Home;
