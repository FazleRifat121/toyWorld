import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaBars, FaSearch, FaShoppingCart } from "react-icons/fa";
import gsap from "gsap";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/clerk-react";
import NavbarUserMenu from "./NavbarUserMenu";

function Navbar() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [products, setProducts] = useState([]);

	const navLogo = useRef();
	const navLinks = useRef([]);
	const searchRef = useRef(null);

	const location = useLocation();
	const navigate = useNavigate();
	const isHome = location.pathname === "/";

	const links = [
		{ name: "Home", to: "/" },
		{ name: "Shop", to: "/shop" },
		{ name: "About", to: "/about" },
		{ name: "Contact", to: "/contact" },
	];

	// Fetch products
	useEffect(() => {
		fetch("/products.json")
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data)) setProducts(data.filter((p) => p?.title));
			})
			.catch((err) => console.error(err));
	}, []);

	// GSAP animation
	useEffect(() => {
		gsap.to(navLogo.current, {
			y: 0,
			opacity: 1,
			duration: 1.2,
			ease: "power3.out",
		});
		gsap.to(navLinks.current, {
			y: 20,
			opacity: 1,
			stagger: 0.1,
			duration: 0.8,
			ease: "power3.out",
		});
	}, []);

	// Live search
	useEffect(() => {
		if (!searchQuery.trim()) {
			setSearchResults([]);
			return;
		}
		const results = products.filter((p) =>
			p.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setSearchResults(results);
	}, [searchQuery, products]);

	// Close search on outside click
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (searchRef.current && !searchRef.current.contains(e.target)) {
				setSearchOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleHover = (idx) =>
		gsap.to(navLinks.current[idx], { rotation: -10, duration: 0.3 });
	const handleLeave = (idx) =>
		gsap.to(navLinks.current[idx], { rotation: 0, duration: 0.3 });

	const handleProductClick = (id) => {
		navigate(`/product/${id}`);
		setSearchOpen(false);
		setSearchQuery("");
	};

	return (
		<div
			className={`navbar bg-transparent px-4 py-3 w-full z-50 backdrop-blur-md border-b border-cyan-500/20 ${
				isHome ? "fixed" : "relative"
			}`}
		>
			{/* Logo */}
			<div className="navbar-start">
				<Link to="/">
					<p
						ref={navLogo}
						className="text-xl lg:text-3xl font-bold neon-flicker"
						style={{ opacity: 0, transform: "translateY(-50px)" }}
					>
						ToyWorld
					</p>
				</Link>
			</div>

			{/* Desktop links */}
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 text-xl flex gap-6 -ml-20 justify-center items-center">
					{links.map((link, index) => (
						<li
							key={index}
							ref={(el) => (navLinks.current[index] = el)}
							style={{ opacity: 0, transform: "translateY(-20px)" }}
							onMouseEnter={() => handleHover(index)}
							onMouseLeave={() => handleLeave(index)}
							className="relative group nav-link cursor-pointer text-white"
						>
							<Link to={link.to} className="transition-colors duration-300">
								<span className="link-text relative z-10">{link.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className="relative" ref={searchRef}>
				<button
					className="p-2 text-cyan-400 hover:text-white"
					onClick={() => setSearchOpen((prev) => !prev)}
				>
					<FaSearch size={20} />
				</button>
				{searchOpen && (
					<div className="absolute top-13 lg:top-10 -left-32 flex flex-col bg-base-200 p-2 rounded shadow-md z-50 w-64">
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search products..."
							className="px-2 py-1 rounded border border-gray-400 focus:outline-cyan-400 mb-2 text-white placeholder:text-gray-400"
							autoFocus
						/>
						<div className="flex flex-col max-h-64 overflow-y-auto">
							{searchResults.length === 0 && searchQuery !== "" ? (
								<p className="text-gray-500 p-2">No products found</p>
							) : (
								searchResults.map((p) => (
									<button
										key={p.id}
										onClick={() => handleProductClick(p.id)}
										className="flex items-center gap-2 p-2 hover:bg-cyan-400 hover:text-black rounded transition-all"
									>
										<img
											src={Array.isArray(p.img) ? p.img[0] : p.img}
											alt={p.title}
											className="w-12 h-12 object-cover rounded"
										/>
										<span>{p.title}</span>
									</button>
								))
							)}
						</div>
					</div>
				)}
			</div>
			{/* Right side */}
			<div className="navbar-end flex items-center gap-2">
				{/* Search */}

				{/* Signed in user */}
				<SignedIn>
					{/* Cart icon can be removed if you include it in dropdown */}
					<NavbarUserMenu
					// boolean from user metadata
					/>
				</SignedIn>

				{/* Signed out */}
				<SignedOut>
					<SignInButton>
						<button className="px-4 py-2 bg-cyan-500 text-black rounded font-bold hover:bg-cyan-400">
							Sign In
						</button>
					</SignInButton>
					<SignUpButton>
						<button className="px-4 py-2 bg-gray-800 text-white rounded font-bold hover:bg-gray-700">
							Sign Up
						</button>
					</SignUpButton>
				</SignedOut>

				{/* Mobile Drawer */}
				<div className="lg:hidden">
					<div className="drawer">
						<input
							id="my-drawer"
							type="checkbox"
							className="drawer-toggle"
							checked={drawerOpen}
							onChange={(e) => setDrawerOpen(e.target.checked)}
						/>
						<div className="drawer-content">
							<label
								htmlFor="my-drawer"
								className="drawer-button btn btn-ghost ml-4"
							>
								<FaBars
									size={24}
									className="text-cyan-400 hover:text-white transition-all duration-300"
								/>
							</label>
						</div>
						<div className="drawer-side">
							<label htmlFor="my-drawer" className="drawer-overlay"></label>
							<ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
								{links.map((link, idx) => (
									<li
										key={idx}
										onClick={() => setDrawerOpen(false)}
										className="hover:text-cyan-400 transition-all duration-300"
									>
										<Link to={link.to}>{link.name}</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Neon Flicker */}
			<style>{`
        .neon-flicker {
          color: #0ff;
          text-shadow:
            0 0 5px #0ff,
            0 0 10px #0ff,
            0 0 20px #0ff,
            0 0 40px #0ff;
          animation: flicker 2s infinite alternate;
        }
        @keyframes flicker {
          0% { opacity: 1; }
          10% { opacity: 0.8; }
          20% { opacity: 1; }
          30% { opacity: 0.85; }
          40% { opacity: 1; }
          50% { opacity: 0.9; }
          60% { opacity: 1; }
          70% { opacity: 0.8; }
          100% { opacity: 1; }
        }
      `}</style>
		</div>
	);
}

export default Navbar;
