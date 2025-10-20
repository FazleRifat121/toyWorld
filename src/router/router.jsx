import { createBrowserRouter } from "react-router";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home/Home.jsx";
import Shop from "../pages/Shop/Shop.jsx";
import ProductDetails from "../components/Products/ProductDetails.jsx";
import Cart from "../pages/Cart/Cart.jsx";
import Checkout from "../components/Checkout/Checkout.jsx";
import SignInPage from "../pages/User/SignInPage.jsx";
import SignUpPage from "../pages/User/SignUpPage.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProtectedMyOrders from "../components/MyOrders/MyOrders.jsx";
import OrderPlaced from "../components/OrderPlaced/OrderPlaced.jsx";

// ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => (
	<>
		<SignedIn>{children}</SignedIn>
		<SignedOut>
			<RedirectToSignIn />
		</SignedOut>
	</>
);

export const router = ({ addToCart, cart, setCart }) =>
	createBrowserRouter([
		{
			element: <MainLayout cart={cart} />, // pass cart to Navbar
			children: [
				{ path: "/", element: <Home /> },
				{ path: "/shop", element: <Shop addToCart={addToCart} /> },
				{
					path: "/product/:id",
					element: <ProductDetails addToCart={addToCart} />,
				},

				{
					path: "/cart",
					element: (
						<ProtectedRoute>
							<Cart cart={cart} setCart={setCart} />
						</ProtectedRoute>
					),
				},

				{
					path: "/checkout",
					element: (
						<ProtectedRoute>
							<Checkout cartItems={cart} setCart={setCart} />
						</ProtectedRoute>
					),
				},

				{ path: "/sign-in", element: <SignInPage /> },
				{ path: "/sign-up", element: <SignUpPage /> },
				{ path: "*", element: <NotFound /> },
				{ path: "/my-orders", element: <ProtectedMyOrders /> },
				{ path: "/order-placed", element: <OrderPlaced /> },
			],
		},
	]);
