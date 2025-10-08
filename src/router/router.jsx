import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetails from "../components/Products/ProductDetails";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<MainLayout />}>
			<Route index element={<Home />} />
			<Route path="/product/:id" element={<ProductDetails />} />
		</Route>
	)
);
