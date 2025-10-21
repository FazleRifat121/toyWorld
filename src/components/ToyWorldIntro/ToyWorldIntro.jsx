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

		// Animate particles
		const animateParticles = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			gsap.to(particlesRef.current, {
				x: () => Math.random() * width - width / 2,
				y: () => Math.random() * height - height / 2,
				scale: () => Math.random() * 2 + 0.5,
				opacity: () => Math.random(),
				duration: 4,
				repeat: -1,
				yoyo: true,
				stagger: 0.05,
				ease: "sine.inOut",
			});
		};

		animateParticles();
		window.addEventListener("resize", animateParticles);
		return () => window.removeEventListener("resize", animateParticles);
	}, []);

	return (
		<div className="intro-container">
			{/* Particles */}
			{Array.from({ length: 100 }).map((_, i) => (
				<div
					key={i}
					className="particle"
					ref={(el) => (particlesRef.current[i] = el)}
				/>
			))}

			{/* Futuristic title */}
			<h1 ref={textRef} className="intro-title">
				ToyWorld
			</h1>
		</div>
	);
}
