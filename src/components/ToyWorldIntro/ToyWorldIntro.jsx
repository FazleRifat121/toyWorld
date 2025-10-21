import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./ToyWorldIntro.css";

export default function ToyWorldIntro({ onFinish }) {
	const textRef = useRef(null);
	const particlesRef = useRef([]);

	useEffect(() => {
		const tl = gsap.timeline({
			onComplete: () => {
				if (onFinish) onFinish();
			},
		});

		// Animate the title
		tl.fromTo(
			textRef.current,
			{ opacity: 0, scale: 0.5, rotationX: 90 },
			{ opacity: 1, scale: 1, rotationX: 0, duration: 2, ease: "power3.out" }
		)
			.to(textRef.current, {
				scale: 1.2,
				duration: 1,
				repeat: 1,
				yoyo: true,
				ease: "power1.inOut",
			})
			.to(textRef.current, { opacity: 0, duration: 1, delay: 0.5 });

		const animateParticles = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			particlesRef.current.forEach((particle) => {
				const anim = () => {
					gsap.to(particle, {
						x: Math.random() * width - particle.offsetLeft,
						y: Math.random() * height - particle.offsetTop,
						scale: Math.random() * 2 + 0.5,
						opacity: Math.random(),
						duration: 2 + Math.random() * 2, // random speed between 2-4s
						ease: "sine.inOut",
						onComplete: anim, // loop each particle individually
					});
				};
				anim();
			});
		};

		animateParticles();
		window.addEventListener("resize", animateParticles);
		return () => window.removeEventListener("resize", animateParticles);
	}, []);

	return (
		<div className="intro-container">
			{Array.from({ length: 100 }).map((_, i) => {
				// Initialize particles at random positions
				const x = Math.random() * window.innerWidth;
				const y = Math.random() * window.innerHeight;
				return (
					<div
						key={i}
						className="particle"
						ref={(el) => (particlesRef.current[i] = el)}
						style={{ top: y, left: x }}
					/>
				);
			})}

			{/* Futuristic title */}
			<h1 ref={textRef} className="intro-title">
				ToyWorld
			</h1>
		</div>
	);
}
