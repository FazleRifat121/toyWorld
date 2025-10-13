import { FaCheckCircle, FaTruck, FaMoneyBillWave } from "react-icons/fa";

export default function Services() {
	const services = [
		{
			icon: <FaCheckCircle size={40} className="text-blue-500" />,
			title: "Best Quality Products",
			desc: "We offer only the highest quality products you can trust.",
		},
		{
			icon: <FaTruck size={40} className="text-green-500" />,
			title: "Delivery within 3 Days",
			desc: "Fast and reliable delivery right to your doorstep.",
		},
		{
			icon: <FaMoneyBillWave size={40} className="text-yellow-500" />,
			title: "Cash on Delivery",
			desc: "Pay conveniently when your order arrives.",
		},
	];

	return (
		<section className="py-16 ">
			<div className="max-w-6xl mx-auto px-6 text-center">
				<h2 className="text-3xl font-bold mb-12">Our Services</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<div
							key={index}
							className="flex flex-col items-center bg-gray-300 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
						>
							<div className="mb-4">{service.icon}</div>
							<h3 className="text-xl font-semibold mb-2 text-black">
								{service.title}
							</h3>
							<p className="text-gray-600">{service.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
