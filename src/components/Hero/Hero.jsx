import { useEffect, useRef } from "react";
import gsap from "gsap";

function Hero() {
	const titleRef = useRef(null);
	const textRef = useRef(null);

	useEffect(() => {
		const tl = gsap.timeline();
		// Animate title
		tl.fromTo(
			titleRef.current,
			{ opacity: 0, scale: 0.8 },
			{ opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
		)
			// Animate text
			.fromTo(
				textRef.current,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
				"-=0.5"
			);
	}, []);

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="text-center">
				<div className="max-w-md">
					<h1
						ref={titleRef}
						className="text-cyan-300 text-5xl lg:text-7xl font-bold neon-hover cursor-pointer"
					>
						Toy World
					</h1>

					<p
						ref={textRef}
						className="py-6 text-white text-md text-wrap  lg:text-lg"
					>
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
						a id nisi.
					</p>
				</div>
			</div>

			{/* Neon glow effect */}
			<style>{`
        .neon-hover {
          transition: text-shadow 0.3s, color 0.3s;
        }
        .neon-hover:hover {
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

export default Hero;
