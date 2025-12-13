import { useState } from "react";
import { Filter } from "lucide-react";
import { useRouter } from "../context/RouterContext";
import { useCart } from "../context/CartContext";
import { games } from "../data/games";
import "./GamesPage.css";

export default function GamesPage() {
  const { navigate, setGameId } = useRouter();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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

  const handleAddToCart = (e: React.MouseEvent, game: any) => {
    e.stopPropagation();
    addToCart(game);
  };

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
                    {game.features.slice(0, 2).map((feature) => (
                      <span key={feature} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="game-footer">
                    <div>
                      <span className="game-rating">★ {game.rating}</span>
                      <span className="game-price">${game.price}</span>
                    </div>
                    <button
                      className="btn-add-cart"
                      onClick={(e) => handleAddToCart(e, game)}
                    >
                      ADD TO CART
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
