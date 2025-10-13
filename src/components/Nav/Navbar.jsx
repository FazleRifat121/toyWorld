import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router"; // fixed import
import { FaBars } from "react-icons/fa";
import gsap from "gsap";

function Navbar() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const navLogo = useRef();
	const navLinks = useRef([]);
	const location = useLocation();
	const isHome = location.pathname === "/";

	const links = [
		{ name: "Home", to: "/" },
		{ name: "Shop", to: "/shop" },
		{ name: "About", to: "/about" },
		{ name: "Contact", to: "/contact" },
	];

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

	const handleHover = (idx) => {
		gsap.to(navLinks.current[idx], { rotation: -10, duration: 0.3 });
	};
	const handleLeave = (idx) => {
		gsap.to(navLinks.current[idx], { rotation: 0, duration: 0.3 });
	};

	return (
		<div
			className={`navbar bg-transparent px-4 py-3 w-full z-50 backdrop-blur-md border-b border-cyan-500/20 ${
				isHome ? "fixed" : "relative"
			}`}
		>
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

			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 text-xl flex gap-6 -ml-48">
					{links.map((link, index) => (
						<li
							key={index}
							ref={(el) => (navLinks.current[index] = el)}
							style={{ opacity: 0, transform: "translateY(-20px)" }}
							onMouseEnter={() => handleHover(index)}
							onMouseLeave={() => handleLeave(index)}
							className="relative group nav-link cursor-pointer"
						>
							<Link to={link.to} className="transition-colors duration-300">
								<span className="link-text relative z-10">{link.name}</span>
								<span className="absolute left-0 bottom-0 w-full h-[2px] bg-cyan-400 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
							</Link>
						</li>
					))}
				</ul>
			</div>

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
