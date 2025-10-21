"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddProduct = () => {
	const [images, setImages] = useState([null, null, null, null]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");
	const [loading, setLoading] = useState(false);

	// ✅ All unique categories from your dataset
	const categories = [
		"Robotics",
		"Vehicles",
		"Action Figures",
		"Building",
		"Plush",
		"Puzzles",
		"STEM",
	];

	const handleFileChange = (index, file) => {
		const newImages = [...images];
		newImages[index] = file;
		setImages(newImages);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!images[0]) return toast.error("Primary image is required");
		if (!title || !description || !price || !category)
			return toast.error("All fields are required");

		setLoading(true);
		try {
			const uploadedUrls = [];
			for (const file of images) {
				if (!file) continue;
				const formData = new FormData();
				formData.append("file", file);

				const { data } = await axios.post(
					"/api/products/upload-image",
					formData,
					{
						headers: { "Content-Type": "multipart/form-data" },
					}
				);

				if (data?.success) uploadedUrls.push(data.url);
				else throw new Error(data.message);
			}

			const { data } = await axios.post("/api/products", {
				title,
				description,
				price,
				category,
				images: uploadedUrls,
			});

			if (data.success) {
				toast.success("Product added successfully!");
				setImages([null, null, null, null]);
				setTitle("");
				setDescription("");
				setPrice("");
				setCategory("");
			} else {
				toast.error(data.message);
			}
		} catch (err) {
			console.error(err);
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl p-6 text-black">
			<h1 className="text-2xl font-semibold mb-4">Add Product</h1>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Image Upload Section */}
				<div>
					<p className="text-base font-medium">Upload Product Images</p>
					<p className="text-sm text-gray-500 mb-2">
						(Primary image is required, others are optional)
					</p>

					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
						{images.map((img, index) => (
							<label
								key={index}
								className="relative cursor-pointer border border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center hover:border-cyan-500 transition"
							>
								<input
									type="file"
									accept="image/*"
									onChange={(e) => handleFileChange(index, e.target.files[0])}
									hidden
								/>
								{img ? (
									<img
										src={URL.createObjectURL(img)}
										alt={`product-${index}`}
										className="w-full h-full object-cover rounded-lg"
									/>
								) : (
									<div className="flex flex-col items-center text-gray-500 text-sm">
										<span className="font-medium">
											{index === 0 ? "Primary" : `Optional ${index}`}
										</span>
										<span>Click to upload</span>
									</div>
								)}
							</label>
						))}
					</div>
				</div>

				{/* Title */}
				<div>
					<p className="text-base font-medium">Product Title</p>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full border rounded p-2 mt-2"
						placeholder="Enter product title"
					/>
				</div>

				{/* Description */}
				<div>
					<p className="text-base font-medium">Description</p>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full border rounded p-2 mt-2"
						rows={4}
						placeholder="Write a short description..."
					/>
				</div>

				{/* Price */}
				<div>
					<p className="text-base font-medium">Price ($)</p>
					<input
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className="w-full border rounded p-2 mt-2"
						placeholder="Enter product price"
					/>
				</div>

				{/* Category Dropdown */}
				<div>
					<p className="text-base font-medium">Category</p>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full border rounded p-2 mt-2 bg-white"
					>
						<option value="">Select category</option>
						{categories.map((cat, i) => (
							<option key={i} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="px-4 py-2 bg-cyan-600 text-white rounded"
					disabled={loading}
				>
					{loading ? "Uploading..." : "Add Product"}
				</button>
			</form>
		</div>
	);
};

export default AddProduct;
