import { FaBoxOpen, FaList, FaShoppingCart, FaCog } from "react-icons/fa";

export default function DashBoardSideBar({ activeTab, setActiveTab }) {
	const menu = [
		{ key: "add", label: "Add Product", icon: <FaBoxOpen /> },
		{ key: "products", label: "My Products", icon: <FaList /> },
		{ key: "orders", label: "Orders", icon: <FaShoppingCart /> },
		{ key: "settings", label: "Settings", icon: <FaCog /> },
	];

	return (
		<div className="w-64 bg-white shadow-lg p-4 flex flex-col">
			<h2 className="text-2xl font-bold mb-6 text-center">Seller Panel</h2>
			<ul className="space-y-2">
				{menu.map((item) => (
					<li
						key={item.key}
						onClick={() => setActiveTab(item.key)}
						className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
							activeTab === item.key
								? "bg-cyan-600 text-white"
								: "text-gray-700 hover:bg-blue-50"
						}`}
					>
						{item.icon}
						<span>{item.label}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
