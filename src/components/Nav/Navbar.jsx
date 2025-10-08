import { useState } from "react";
import { Link } from "react-router"; // use react-router-dom
import { FaBars } from "react-icons/fa";

function Navbar() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	// Links as an array
	const links = [
		{ name: "Home", to: "/" },
		{ name: "Shop", to: "/shop" },
		{ name: "About", to: "/about" },
		{ name: "Contact", to: "/contact" },
	];

	return (
		<div className="navbar bg-transparent px-4">
			<div className="navbar-start">
				<a className="btn btn-ghost text-xl font-bold">ToyWorld</a>
			</div>

			{/* Navbar for large screens */}
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 text-xl flex gap-6 -ml-48">
					{links.map((link, index) => (
						<li
							key={index}
							className="transition-transform duration-300 hover:scale-105 hover:text-cyan-400"
						>
							<Link to={link.to}>{link.name}</Link>
						</li>
					))}
				</ul>
			</div>

			{/* Drawer for mobile */}
			<div className="navbar-end lg:hidden">
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
							className="drawer-button btn btn-ghost ml-32 md:ml-64"
						>
							<FaBars size={24} />
						</label>
					</div>
					<div className="drawer-side">
						<label htmlFor="my-drawer" className="drawer-overlay"></label>
						<ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
							{links.map((link, idx) => (
								<li key={idx} onClick={() => setDrawerOpen(false)}>
									<Link to={link.to}>{link.name}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
