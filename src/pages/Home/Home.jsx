import { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";
import Services from "../../components/Services/Services";
import Newsletter from "../../components/NewsLetter/NewsLetter";

function Home() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div>
			<Hero />
			<Products />
			<Services />
			<Newsletter />
		</div>
	);
}

export default Home;
