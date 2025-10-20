import vdo from "../../assets/hero/videoplayback.mp4";

function Hero() {
	return (
		<div className="relative h-screen w-full overflow-hidden">
			{/* Video Background */}
			<video
				src={vdo}
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				className="absolute top-0 left-0 w-full h-full object-cover"
			/>

			{/* Overlay */}
			<div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>

			{/* Hero Content */}
			<div className="relative z-20 flex justify-center items-center h-full text-center px-4">
				<div className="max-w-md">
					<h1 className="text-[#0ff] text-7xl font-bold neon-text hover:cursor-pointer">
						Toy World
					</h1>
					<p className="py-6 text-white">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
						a id nisi.
					</p>
				</div>
			</div>

			{/* Neon text style */}
			<style>{`
        .neon-text {
          text-shadow:
            0 0 5px #0ff,
            0 0 10px #0ff,
            0 0 20px #0ff,
            0 0 40px #0ff;
          animation: glowTitle 2s infinite alternate;
        }

        @keyframes glowTitle {
          0% { text-shadow: 0 0 5px #0ff,0 0 10px #0ff,0 0 20px #0ff,0 0 40px #0ff; }
          50% { text-shadow: 0 0 10px #0ff,0 0 20px #0ff,0 0 30px #0ff,0 0 60px #0ff; }
          100% { text-shadow: 0 0 5px #0ff,0 0 10px #0ff,0 0 20px #0ff,0 0 40px #0ff; }
        }
      `}</style>
		</div>
	);
}

export default Hero;
