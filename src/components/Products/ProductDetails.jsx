import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import RelatedProducts from "./RelatedProducts";
import Loading from "../Loading/Loading.jsx";
function ProductDetails({ addToCart }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user, isSignedIn } = useUser();

	const [product, setProduct] = useState(null);
	const [mainImage, setMainImage] = useState("");
	const [reviews, setReviews] = useState([]);
	const [editingReviewId, setEditingReviewId] = useState(null);
	const [reviewText, setReviewText] = useState("");
	const [rating, setRating] = useState(5);
	const [replyText, setReplyText] = useState({}); // {reviewId: text}

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

				let storedReviews =
					JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];

				// Normalize likes to always be an array
				storedReviews = storedReviews.map((r) => ({
					...r,
					likes: Array.isArray(r.likes) ? r.likes : [],
					replies: Array.isArray(r.replies) ? r.replies : [],
				}));

				setReviews(storedReviews);
			} catch (err) {
				console.error(err);
				toast.error("Failed to load product");
			}
		};
		fetchProduct();
	}, [id]);

	if (!product)
		return (
			<div className="min-h-screen flex items-center justify-center text-white">
				<Loading />
			</div>
		);

	const images = Array.isArray(product.img) ? product.img : [product.img];

	// Cart
	const handleAddToCart = () => {
		addToCart(product);
		toast.success("Added to cart!");
	};

	const handleBuyNow = () => {
		handleAddToCart();
		navigate("/cart");
	};

	// Review submission
	const handleSubmitReview = (e) => {
		e.preventDefault();
		if (!reviewText.trim()) return toast.error("Please enter a review");
		if (!isSignedIn) return toast.error("Please sign in to review");

		if (editingReviewId) {
			// Edit review
			const updated = reviews.map((r) =>
				r.id === editingReviewId
					? { ...r, comment: reviewText, rating, edited: true }
					: r
			);
			setReviews(updated);
			localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));
			toast.success("Review updated!");
			setEditingReviewId(null);
		} else {
			const newReview = {
				id: Date.now(),
				userId: user.id,
				name: user.fullName || user.username || "Anonymous",
				userImage: user.profileImageUrl,
				comment: reviewText,
				rating,
				likes: [],
				replies: [],
				createdAt: new Date().toISOString(),
			};
			const updatedReviews = [newReview, ...reviews];
			setReviews(updatedReviews);
			localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
			toast.success("Review added!");
		}

		setReviewText("");
		setRating(5);
	};

	// Like/unlike toggle
	const handleLike = (reviewId) => {
		if (!isSignedIn) return toast.error("Sign in to like");
		const updated = reviews.map((r) => {
			if (r.id === reviewId) {
				const hasLiked = r.likes.includes(user.id);
				const newLikes = hasLiked
					? r.likes.filter((uid) => uid !== user.id)
					: [...r.likes, user.id];
				return { ...r, likes: newLikes };
			}
			return r;
		});
		setReviews(updated);
		localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));
	};

	// Edit/Delete
	const handleEdit = (rev) => {
		setEditingReviewId(rev.id);
		setReviewText(rev.comment);
		setRating(rev.rating);
	};
	const handleDelete = (reviewId) => {
		const updated = reviews.filter((r) => r.id !== reviewId);
		setReviews(updated);
		localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));
		toast.success("Review deleted");
	};

	// Reply submission
	const handleReply = (reviewId) => {
		if (!isSignedIn) return toast.error("Sign in to reply");
		if (!replyText[reviewId]?.trim()) return;

		const newReply = {
			id: Date.now(),
			userId: user.id,
			name: user.fullName || user.username || "Anonymous",
			userImage: user.profileImageUrl,
			comment: replyText[reviewId],
			createdAt: new Date().toISOString(),
		};

		const updated = reviews.map((r) =>
			r.id === reviewId ? { ...r, replies: [...r.replies, newReply] } : r
		);
		setReviews(updated);
		localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));

		setReplyText((prev) => ({ ...prev, [reviewId]: "" }));
	};

	const averageRating = reviews.length
		? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(
				1
		  )
		: null;

	return (
		<div className="min-h-screen p-8 text-white space-y-10">
			{/* Product */}
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

			{/* Reviews */}
			<div className="max-w-5xl mx-auto space-y-6">
				<h2 className="text-2xl font-bold flex items-center gap-2">
					Reviews{" "}
					{averageRating && (
						<span className="text-yellow-400 text-xl">
							⭐ {averageRating} ({reviews.length})
						</span>
					)}
				</h2>

				{isSignedIn ? (
					<form
						onSubmit={handleSubmitReview}
						className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg"
					>
						<div className="flex gap-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<span
									key={star}
									onClick={() => setRating(star)}
									className={`cursor-pointer text-2xl ${
										rating >= star ? "text-yellow-400" : "text-gray-400"
									}`}
								>
									★
								</span>
							))}
						</div>
						<textarea
							placeholder="Write your review..."
							value={reviewText}
							onChange={(e) => setReviewText(e.target.value)}
							className="p-2 rounded bg-gray-700 text-white"
							required
						/>
						<button
							type="submit"
							className="px-4 py-2 bg-cyan-500 rounded font-bold text-black"
						>
							{editingReviewId ? "Update Review" : "Submit Review"}
						</button>
					</form>
				) : (
					<p className="text-gray-400">
						Please <span className="text-cyan-400">sign in</span> to post a
						review.
					</p>
				)}

				<div className="space-y-4">
					{reviews.length === 0 && <p>No reviews yet.</p>}
					{reviews.map((rev) => (
						<div
							key={rev.id}
							className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2"
						>
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-2">
									<img
										src={rev.userImage || "https://via.placeholder.com/32"}
										alt={rev.name}
										className="w-8 h-8 rounded-full object-cover"
									/>
									<p className="font-bold text-cyan-400">{rev.name}</p>
								</div>
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
							{rev.edited && <p className="text-xs text-gray-400">(Edited)</p>}

							<div className="flex gap-4 items-center">
								<button
									onClick={() => handleLike(rev.id)}
									className={`px-2 py-1 rounded ${
										rev.likes.includes(user?.id)
											? "bg-green-600 text-black"
											: "bg-gray-600"
									}`}
								>
									👍 {rev.likes.length}
								</button>

								{isSignedIn && rev.userId === user.id && (
									<div className="ml-auto flex gap-2">
										<button
											onClick={() => handleEdit(rev)}
											className="px-2 py-1 bg-yellow-500 text-black rounded"
										>
											Edit
										</button>
										<button
											onClick={() => handleDelete(rev.id)}
											className="px-2 py-1 bg-red-500 text-black rounded"
										>
											Delete
										</button>
									</div>
								)}
							</div>

							{/* Reply section */}
							<div className="pl-10 mt-2 space-y-2">
								{rev.replies?.map((rep) => (
									<div
										key={rep.id}
										className="flex items-start gap-2 bg-gray-700 p-2 rounded"
									>
										<img
											src={rep.userImage || "https://via.placeholder.com/28"}
											alt={rep.name}
											className="w-7 h-7 rounded-full object-cover mt-1"
										/>
										<p>
											<span className="font-bold text-cyan-400">
												{rep.name}:{" "}
											</span>
											{rep.comment}
										</p>
									</div>
								))}

								{isSignedIn && (
									<div className="flex gap-2 mt-1">
										<input
											type="text"
											placeholder="Reply..."
											value={replyText[rev.id] || ""}
											onChange={(e) =>
												setReplyText((prev) => ({
													...prev,
													[rev.id]: e.target.value,
												}))
											}
											className="p-1 rounded bg-gray-700 text-white flex-1"
										/>
										<button
											onClick={() => handleReply(rev.id)}
											className="px-2 py-1 bg-cyan-500 text-black rounded"
										>
											Reply
										</button>
									</div>
								)}
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
