import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { useRouter } from "../context/RouterContext";
import { useCart } from "../context/CartContext";
import { gamesAPI } from "../services/api";
import type { Game } from "../types";
import "./GamesPage.css";

export default function GamesPage() {
  const { navigate, setGameId } = useRouter();
  const { addToCart, isInCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const response = await gamesAPI.getAll();
      // response is already unwrapped - it's the array of games directly
      const gamesArray = Array.isArray(response) ? response : [];
      setGames(
        gamesArray.map((g: any) => ({
          id: String(g.id),
          title: g.title,
          description: g.description || "",
          price: Number(g.price),
          image: g.image || "https://via.placeholder.com/460x215",
          category: g.category || "Action",
          rating: Number(g.rating) || 0,
          features: g.features || [],
        }))
      );
    } catch (err) {
      console.error("Failed to load games:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    ...Array.from(new Set(games.map((g) => g.category))),
  ];

  const filteredGames =
    selectedCategory === "All"
      ? games
      : games.filter((game) => game.category === selectedCategory);

  const handleViewGame = (gameId: string) => {
    setGameId(gameId);
    navigate("game-details");
  };

  const handleAddToCart = (e: React.MouseEvent, game: Game) => {
    e.stopPropagation();
    addToCart(game);
  };

  if (loading) {
    return (
      <div className="games-page">
        <div className="games-hero">
          <h1>OUR GAMES</h1>
          <p>Loading games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="games-page">
      <div className="games-hero">
        <h1>OUR GAMES</h1>
        <p>Explore our collection of epic gaming experiences</p>
      </div>

      <div className="games-container">
        <aside className="games-sidebar">
          <div className="filter-header">
            <Filter size={24} />
            <h3>FILTER</h3>
          </div>
          <div className="filter-section">
            <h4>CATEGORIES</h4>
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="games-main">
          <div className="games-header">
            <h2>
              {selectedCategory === "All"
                ? "ALL GAMES"
                : selectedCategory.toUpperCase()}
            </h2>
            <span className="games-count">{filteredGames.length} Games</span>
          </div>

          <div className="games-grid">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => handleViewGame(game.id)}
              >
                <div className="game-image">
                  <img src={game.image} alt={game.title} />
                  <div className="game-overlay">
                    <button className="btn-view">VIEW DETAILS</button>
                  </div>
                </div>
                <div className="game-info">
                  <h3>{game.title}</h3>
                  <p className="game-category">{game.category}</p>
                  <div className="game-features">
                    {game.features?.slice(0, 2).map((feature) => (
                      <span key={feature} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="game-footer">
                    <div>
                      <span className="game-rating">★ {game.rating.toFixed(1)}</span>
                      <span className="game-price">${game.price.toFixed(2)}</span>
                    </div>
                    <button
                      className={`btn-add-cart ${isInCart(game.id) ? "in-cart" : ""}`}
                      onClick={(e) => handleAddToCart(e, game)}
                    >
                      {isInCart(game.id) ? "IN CART" : "ADD TO CART"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
