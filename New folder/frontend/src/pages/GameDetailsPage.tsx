import { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "../context/RouterContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { games } from "../data/games";
import { Review } from "../types";
import "./GameDetailsPage.css";

export default function GameDetailsPage() {
  const { navigate, gameId } = useRouter();
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const game = games.find((g) => g.id === gameId);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      gameId: gameId || "",
      userId: "1",
      userName: "ProGamer123",
      rating: 5,
      comment:
        "Amazing game! The graphics are stunning and gameplay is smooth. Highly recommended!",
      date: "2024-12-10",
    },
    {
      id: "2",
      gameId: gameId || "",
      userId: "2",
      userName: "GameMaster",
      rating: 4,
      comment:
        "Great multiplayer experience. A few bugs but overall very fun to play.",
      date: "2024-12-08",
    },
  ]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  if (!game) {
    return (
      <div className="game-details-page">
        <div className="error-container">
          <h2>Game not found</h2>
          <button className="btn-back" onClick={() => navigate("games")}>
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(game);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      navigate("login");
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      gameId: game.id,
      userId: user.id,
      userName: user.name,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([review, ...reviews]);
    setNewComment("");
    setNewRating(5);
    setShowReviewForm(false);
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : game.rating;

  return (
    <div className="game-details-page">
      <button className="btn-back" onClick={() => navigate("games")}>
        <ArrowLeft size={20} />
        Back to Games
      </button>

      <div className="game-details-hero">
        <div className="game-details-image">
          <img src={game.image} alt={game.title} />
        </div>
        <div className="game-details-info">
          <div className="game-badge">{game.category}</div>
          <h1>{game.title}</h1>
          <div className="game-rating-section">
            <span className="rating-stars">★ {averageRating}</span>
            <span className="rating-count">({reviews.length} reviews)</span>
          </div>
          <p className="game-description">{game.description}</p>
          <div className="game-price-section">
            <span className="price">${game.price}</span>
            <button className="btn-purchase" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="game-features-section">
        <h2>GAME FEATURES</h2>
        <div className="features-list">
          {game.features.map((feature) => (
            <div key={feature} className="feature-item">
              <span className="feature-bullet">●</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>PLAYER REVIEWS</h2>
          {isAuthenticated ? (
            <button
              className="btn-write-review"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? "CANCEL" : "WRITE REVIEW"}
            </button>
          ) : (
            <button
              className="btn-write-review"
              onClick={() => navigate("login")}
            >
              LOGIN TO REVIEW
            </button>
          )}
        </div>

        {showReviewForm && (
          <form className="review-form" onSubmit={handleSubmitReview}>
            <h3>Write Your Review</h3>
            <div className="form-group">
              <label>Your Rating</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${star <= newRating ? "active" : ""}`}
                    onClick={() => setNewRating(star)}
                  >
                    <Star
                      size={32}
                      fill={star <= newRating ? "#fbbf24" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Your Review</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this game..."
                rows={5}
                required
              />
            </div>
            <button type="submit" className="btn-submit-review">
              SUBMIT REVIEW
            </button>
          </form>
        )}

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">
              No reviews yet. Be the first to review this game!
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div>
                    <h4>{review.userName}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-rating">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
