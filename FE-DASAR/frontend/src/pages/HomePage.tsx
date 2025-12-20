import { Zap, Users, Trophy, Gamepad } from "lucide-react";
import { useRouter } from "../context/RouterContext";
import { games } from "../data/games";
import "./HomePage.css";

export default function HomePage() {
  const { navigate, setGameId } = useRouter();

  const featuredGames = games.slice(0, 4);

  const handleViewGame = (gameId: string) => {
    setGameId(gameId);
    navigate("game-details");
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">NOW AVAILABLE</div>
          <h1 className="hero-title">
            <span className="title-white">EPIC</span>
            <span className="title-yellow">GAMING</span>
          </h1>
          <p className="hero-subtitle">THE ULTIMATE GAMING EXPERIENCE</p>
          <div className="hero-buttons">
            <button
              className="btn-hero-primary"
              onClick={() => navigate("games")}
            >
              PLAY NOW
            </button>
            <button
              className="btn-hero-secondary"
              onClick={() => navigate("about")}
            >
              WATCH TRAILER
            </button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">
          GAME <span className="highlight">FEATURES</span>
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={32} />
            </div>
            <h3>FAST ACTION</h3>
            <p>
              Lightning-fast gameplay with smooth physics and instant response
              times
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h3>MULTIPLAYER</h3>
            <p>
              Challenge friends locally or compete against players worldwide
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Trophy size={32} />
            </div>
            <h3>TOURNAMENTS</h3>
            <p>
              Compete in ranked tournaments and climb the global leaderboards
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Gamepad size={32} />
            </div>
            <h3>ARCADE MODE</h3>
            <p>Classic arcade-style challenges with power-ups and bonuses</p>
          </div>
        </div>
      </section>

      <section className="featured-games">
        <h2 className="section-title">
          FEATURED <span className="highlight">GAMES</span>
        </h2>
        <div className="games-grid">
          {featuredGames.map((game) => (
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
                <div className="game-footer">
                  <span className="game-rating">★ {game.rating}</span>
                  <span className="game-price">${game.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <button className="btn-view-all" onClick={() => navigate("games")}>
            VIEW ALL GAMES
          </button>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>READY TO PLAY?</h2>
          <p>Join thousands of players worldwide</p>
          <button className="btn-cta" onClick={() => navigate("games")}>
            GET STARTED
          </button>
        </div>
      </section>
    </div>
  );
}
