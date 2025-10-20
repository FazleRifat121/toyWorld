import React from "react";

export default function NotFound({ homeHref = "/" }) {
	return (
		<main className="min-h-screen flex items-center justify-center  px-6">
			<div className="max-w-4xl w-full bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-8">
				{/* Left: Illustration */}
				<div className="flex-1 flex items-center justify-center">
					<svg
						viewBox="0 0 600 400"
						className="w-64 h-64 md:w-80 md:h-80 transform-gpu motion-safe:animate-[float_6s_ease-in-out_infinite]"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<defs>
							<linearGradient id="g1" x1="0" x2="1">
								<stop offset="0%" stopColor="#7dd3fc" />
								<stop offset="100%" stopColor="#a78bfa" />
							</linearGradient>
						</defs>

						<rect
							x="40"
							y="40"
							width="520"
							height="320"
							rx="24"
							fill="url(#g1)"
							opacity="0.12"
						/>

						<g transform="translate(120,80)">
							<circle cx="100" cy="80" r="60" fill="#fff" opacity="0.9" />
							<path
								d="M40 200 C120 140, 220 140, 300 200"
								stroke="#7dd3fc"
								strokeWidth="12"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								opacity="0.9"
							/>
							<g transform="translate(60,20)">
								<text
									x="3"
									y="75"
									fontSize="42"
									fontWeight="700"
									fill="#0f172a"
								>
									404
								</text>
							</g>
						</g>

						<g transform="translate(430,280)">
							<circle cx="0" cy="0" r="12" fill="#fb7185" opacity="0.9" />
						</g>
					</svg>
				</div>

				{/* Right: Text */}
				<div className="flex-1 text-center md:text-left">
					<h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900">
						Oops.
					</h1>
					<p className="mt-2 text-xl md:text-2xl text-slate-700">
						We can't find the page you're looking for.
					</p>

					<p className="mt-4 text-sm text-slate-500 max-w-xl">
						Either the link is broken or the page has been moved. Try going back
						to the homepage or check the URL.
					</p>

					<div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3">
						<a
							href={homeHref}
							className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3  font-medium shadow-md hover:scale-[1.02] active:scale-95 transition-transform  bg-cyan-500  glowing-button text-black"
						>
							Go home
						</a>

						<button
							onClick={() => window.history.back()}
							className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition glowing-button"
						>
							Go back
						</button>
					</div>

					<footer className="mt-6 text-xs text-slate-400">
						If you think this is a mistake,{" "}
						<a href="mailto:hello@example.com" className="underline">
							contact us
						</a>
						.
					</footer>
				</div>
			</div>

			{/* Floating animation keyframes for browsers that support inline style animation names (Tailwind can be configured to include this) */}
			<style>
				{`
        @keyframes float { 0% { transform: translateY(0) } 50% { transform: translateY(-12px) } 100% { transform: translateY(0) } }
        .animate-[float_6s_ease-in-out_infinite] { animation: float 6s ease-in-out infinite; }
      `}
				{`
       
      
			 /* Button glow on hover */
			 .glowing-button {
				 transition: all 0.3s ease-in-out;
			 }
			 .glowing-button:hover {
				 box-shadow:
					 0 0 5px #0ff,
					 0 0 10px #0ff,
					 0 0 20px #0ff,
					 0 0 40px #0ff;
				 transform: scale(1.05);
      }`}
			</style>
		</main>
	);
}
