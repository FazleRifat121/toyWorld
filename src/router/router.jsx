import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import ProductDetails from "../components/Products/ProductDetails";
import Cart from "../pages/Cart/Cart";
import NotFound from "../pages/NotFound";
import Checkout from "../components/Checkout/Checkout";

export const router = ({ addToCart, cart, setCart }) =>
	createBrowserRouter(
		createRoutesFromElements(
			<Route element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path="/shop" element={<Shop />} />
				<Route
					path="/product/:id"
					element={<ProductDetails addToCart={addToCart} />}
				/>
				<Route
					path="/cart"
					element={<Cart cartItems={cart} setCart={setCart} />}
				/>

				<Route
					path="/checkout"
					element={<Checkout cartItems={cart} setCart={setCart} />}
				/>
				<Route path="*" element={<NotFound />} />
			</Route>
		)
	);
