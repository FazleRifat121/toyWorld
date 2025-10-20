import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import RelatedProducts from "./RelatedProducts";

function ProductDetails({ addToCart }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [mainImage, setMainImage] = useState("");
	const [reviews, setReviews] = useState([]);
	const [userReview, setUserReview] = useState({
		name: "",
		rating: 5,
		comment: "",
	});

	useEffect(() => {
		window.scrollTo(0, 0);

		const fetchProduct = async () => {
			try {
				const res = await fetch("/products.json");
				const data = await res.json();
				const found = data.find((p) => p.id === parseInt(id));
				setProduct(found || null);
				if (found)
					setMainImage(Array.isArray(found.img) ? found.img[0] : found.img);

				const storedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`));
				if (storedReviews) setReviews(storedReviews);
			} catch (err) {
				console.error(err);
				toast.error("Failed to load product");
			}
		};
		fetchProduct();
	}, [id]);

	if (!product)
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading...
			</div>
		);

	const images = Array.isArray(product.img) ? product.img : [product.img];

	const handleAddToCart = () => {
		addToCart(product);
		toast.success("Added to cart!");
	};

	const handleBuyNow = () => {
		handleAddToCart();
		navigate("/cart");
	};

	const handleReviewChange = (e) => {
		const { name, value } = e.target;
		setUserReview((prev) => ({ ...prev, [name]: value }));
	};

	const handleStarClick = (star) => {
		setUserReview((prev) => ({ ...prev, rating: star }));
	};

	const handleSubmitReview = (e) => {
		e.preventDefault();
		if (!userReview.name || !userReview.comment)
			return toast.error("Enter name and comment");

		const newReview = { ...userReview, id: Date.now(), likes: 0, dislikes: 0 };
		const updatedReviews = [newReview, ...reviews];
		setReviews(updatedReviews);
		localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
		setUserReview({ name: "", rating: 5, comment: "" });
		toast.success("Review submitted!");
	};

	const handleLike = (reviewId) => {
		const updated = reviews.map((r) =>
			r.id === reviewId ? { ...r, likes: r.likes + 1 } : r
		);
		setReviews(updated);
		localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));
	};
	const handleDislike = (reviewId) => {
		const updated = reviews.map((r) =>
			r.id === reviewId ? { ...r, dislikes: r.dislikes + 1 } : r
		);
		setReviews(updated);
		localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));
	};

	const averageRating = reviews.length
		? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(
				1
		  )
		: null;

	return (
		<div className="min-h-screen p-8 text-white space-y-10">
			<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
				<div>
					<img
						src={mainImage}
						alt={product.title}
						className="w-full h-full object-cover rounded-lg mb-4"
					/>
					{images.length > 1 && (
						<div className="flex gap-2">
							{images.map((img, idx) => (
								<img
									key={idx}
									src={img}
									alt={`${product.title}-${idx}`}
									className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
										img === mainImage ? "border-cyan-500" : "border-gray-700"
									}`}
									onClick={() => setMainImage(img)}
								/>
							))}
						</div>
					)}
				</div>

				<div className="flex flex-col gap-4">
					<h1 className="text-4xl font-bold text-cyan-400">{product.title}</h1>
					<p className="text-gray-300">{product.description}</p>
					<p className="text-2xl font-bold">
						${product.offerPrice ?? product.price}{" "}
						{product.offerPrice && (
							<span className="line-through text-gray-500 ml-2">
								${product.price}
							</span>
						)}
					</p>
					<div className="flex gap-4 mt-4">
						<button
							onClick={handleAddToCart}
							className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg"
						>
							Add to Cart
						</button>
						<button
							onClick={handleBuyNow}
							className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg"
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>

			<div className="max-w-5xl mx-auto space-y-6">
				<h2 className="text-2xl font-bold flex items-center gap-2">
					Reviews{" "}
					{averageRating && (
						<span className="text-yellow-400 text-xl">
							⭐ {averageRating} ({reviews.length})
						</span>
					)}
				</h2>

				<form
					onSubmit={handleSubmitReview}
					className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg"
				>
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						value={userReview.name}
						onChange={handleReviewChange}
						className="p-2 rounded bg-gray-700 text-white"
						required
					/>
					<div className="flex gap-1">
						{[1, 2, 3, 4, 5].map((star) => (
							<span
								key={star}
								onClick={() => handleStarClick(star)}
								className={`cursor-pointer text-2xl ${
									userReview.rating >= star
										? "text-yellow-400"
										: "text-gray-400"
								}`}
							>
								★
							</span>
						))}
					</div>
					<textarea
						name="comment"
						placeholder="Your Review"
						value={userReview.comment}
						onChange={handleReviewChange}
						className="p-2 rounded bg-gray-700 text-white"
						required
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-cyan-500 rounded font-bold text-black"
					>
						Submit Review
					</button>
				</form>

				<div className="space-y-4">
					{reviews.length === 0 && <p>No reviews yet.</p>}
					{reviews.map((rev) => (
						<div
							key={rev.id}
							className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2"
						>
							<div className="flex justify-between">
								<p className="font-bold">{rev.name}</p>
								<p>
									{[1, 2, 3, 4, 5].map((star) => (
										<span
											key={star}
											className={`text-lg ${
												rev.rating >= star ? "text-yellow-400" : "text-gray-400"
											}`}
										>
											★
										</span>
									))}
								</p>
							</div>
							<p>{rev.comment}</p>
							<div className="flex gap-4">
								<button
									onClick={() => handleLike(rev.id)}
									className="px-2 py-1 bg-green-600 rounded"
								>
									👍 {rev.likes}
								</button>
								<button
									onClick={() => handleDislike(rev.id)}
									className="px-2 py-1 bg-red-600 rounded"
								>
									👎 {rev.dislikes}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			<RelatedProducts
				currentProductId={product.id}
				category={product.category}
			/>
		</div>
	);
}

export default ProductDetails;
