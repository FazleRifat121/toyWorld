import { useState } from "react";
import DashboardSideBar from "../components/Dashboard/DashboardSideBar";
import AddProducts from "../components/Dashboard/AddProducts";
// import ProductList from "./ProductList";
// import Orders from "./Orders";
// import Settings from "./Settings";

export default function DashboardLayout() {
	const [activeTab, setActiveTab] = useState("add");

	const renderContent = () => {
		switch (activeTab) {
			case "add":
				return <AddProducts />;
			// case "products":
			// 	return <ProductList />;
			// case "orders":
			// 	return <Orders />;
			// case "settings":
			// 	return <Settings />;
			default:
				return <AddProduct />;
		}
	};

	return (
		<div className="flex h-screen bg-gray-100">
			<DashboardSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
		</div>
	);
}
