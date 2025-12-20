import { useState, useEffect } from "react";
import { ArrowLeft, Star, Trash2 } from "lucide-react";
import { useRouter } from "../context/RouterContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { gamesAPI, reviewsAPI, purchasesAPI } from "../services/api";
import { Game, Review } from "../types";
import "./GameDetailsPage.css";

export default function GameDetailsPage() {
  const { navigate, gameId } = useRouter();
  const { addToCart, isInCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [game, setGame] = useState<Game | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [owned, setOwned] = useState(false);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (gameId) {
      loadGameData();
    }
  }, [gameId, isAuthenticated]);

  const loadGameData = async () => {
    try {
      setLoading(true);
      const [gameResponse, reviewsResponse] = await Promise.all([
        gamesAPI.getById(gameId!),
        reviewsAPI.getByGame(gameId!),
      ]);
      
      // Response is already unwrapped by API service
      setGame({
        id: String(gameResponse.id),
        title: gameResponse.title,
        description: gameResponse.description || "",
        price: Number(gameResponse.price),
        image: gameResponse.image || "https://via.placeholder.com/460x215",
        category: gameResponse.category || "Action",
        rating: Number(gameResponse.rating) || 0,
        features: gameResponse.features || [],
        is_visible: gameResponse.is_visible,
      });
      
      const reviewsArray = Array.isArray(reviewsResponse) ? reviewsResponse : [];
      setReviews(reviewsArray.map((r: any) => ({
        id: String(r.id),
        game_id: String(r.gameId || r.game_id),
        user_id: String(r.userId || r.user_id),
        user: { id: String(r.userId || r.user_id), username: r.userName || r.user?.username || 'Anonymous' },
        rating: r.rating,
        content: r.comment || r.content,
        created_at: r.date || r.created_at,
      })));

      // Check ownership if authenticated
      if (isAuthenticated && gameId) {
        try {
          const ownershipResponse = await purchasesAPI.checkOwnership(gameId);
          setOwned(ownershipResponse.owned);
        } catch {
          setOwned(false);
        }
      }
    } catch (err) {
      console.error("Failed to load game:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (game) {
      addToCart(game);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user || !gameId) {
      navigate("login");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await reviewsAPI.create(gameId, newRating, newComment);
      await loadGameData(); // Reload reviews
      setNewComment("");
      setNewRating(5);
      setShowReviewForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!gameId) return;
    try {
      await reviewsAPI.delete(gameId, reviewId);
      await loadGameData();
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  if (loading) {
    return (
      <div className="game-details-page">
        <div className="loading-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

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

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : game.rating.toFixed(1);

  const userHasReviewed = reviews.some(
    (r) => user && String(r.user_id) === String(user.id)
  );

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
            <span className="price">${game.price.toFixed(2)}</span>
            {owned ? (
              <button className="btn-owned" disabled>
                OWNED
              </button>
            ) : isInCart(game.id) ? (
              <button className="btn-in-cart" onClick={() => navigate("cart")}>
                VIEW IN CART
              </button>
            ) : (
              <button className="btn-purchase" onClick={handleAddToCart}>
                ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>

      {game.features && game.features.length > 0 && (
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
      )}

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>PLAYER REVIEWS</h2>
          {isAuthenticated ? (
            userHasReviewed ? (
              <span className="already-reviewed">You've reviewed this game</span>
            ) : (
              <button
                className="btn-write-review"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                {showReviewForm ? "CANCEL" : "WRITE REVIEW"}
              </button>
            )
          ) : (
            <button
              className="btn-write-review"
              onClick={() => navigate("login")}
            >
              LOGIN TO REVIEW
            </button>
          )}
        </div>

        {error && <div className="review-error">{error}</div>}

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
            <button type="submit" className="btn-submit-review" disabled={submitting}>
              {submitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
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
                    <h4>{review.user?.username || "Anonymous"}</h4>
                    <span className="review-date">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="review-actions">
                    <div className="review-rating">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                    {user && String(review.user_id) === String(user.id) && (
                      <button
                        className="btn-delete-review"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="review-comment">{review.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
