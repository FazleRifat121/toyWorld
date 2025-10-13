import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router";

import ProductDetails from "../components/Products/ProductDetails";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<MainLayout />}>
			<Route index element={<Home />} />
			<Route path="/product/:id" element={<ProductDetails />} />
			<Route path="/shop" element={<Shop />} />
		</Route>
	)
);
