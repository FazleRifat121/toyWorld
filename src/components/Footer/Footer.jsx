import { Link } from "react-router";

function Footer() {
	return (
		<div>
			<footer className="footer sm:footer-horizontal bg-[#0000002d] text-base-content p-10 mt-20">
				<aside>
					<Link to="/">
						<p className="text-3xl font-bold neon-flicker">ToyWorld</p>
					</Link>
				</aside>
				<nav>
					<h6 className="footer-title">Services</h6>
					<a className="link link-hover">Branding</a>
					<a className="link link-hover">Design</a>
					<a className="link link-hover">Marketing</a>
					<a className="link link-hover">Advertisement</a>
				</nav>
				<nav>
					<h6 className="footer-title">Company</h6>
					<a className="link link-hover">About us</a>
					<a className="link link-hover">Contact</a>
					<a className="link link-hover">Jobs</a>
					<a className="link link-hover">Press kit</a>
				</nav>
				<nav>
					<h6 className="footer-title">Legal</h6>
					<a className="link link-hover">Terms of use</a>
					<a className="link link-hover">Privacy policy</a>
					<a className="link link-hover">Cookie policy</a>
				</nav>
			</footer>

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
          10% { opacity: 0.85; }
          20% { opacity: 1; }
          40% { opacity: 0.9; }
          60% { opacity: 1; }
          70% { opacity: 0.8; }
          100% { opacity: 1; }
        }
      `}</style>
		</div>
	);
}

export default Footer;
