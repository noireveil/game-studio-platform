import { useState } from "react";
import {
  BarChart3,
  Users,
  ShoppingBag,
  Star,
  Plus,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import { games as initialGames } from "../data/games";
import "./AdminPage.css";

interface Game {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
}

type TabType = "dashboard" | "games" | "users" | "reviews";

export default function AdminPage() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [showGameForm, setShowGameForm] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    image: "",
    description: "",
    category: "",
    rating: 0,
  });

  const [users] = useState([
    {
      id: "1",
      name: "ProGamer123",
      email: "pro@example.com",
      games: 12,
      spent: "$599.99",
      joined: "2024-10-15",
    },
    {
      id: "2",
      name: "GameMaster",
      email: "master@example.com",
      games: 8,
      spent: "$449.99",
      joined: "2024-11-01",
    },
    {
      id: "3",
      name: "Player_X",
      email: "playerx@example.com",
      games: 5,
      spent: "$299.99",
      joined: "2024-11-20",
    },
    {
      id: "4",
      name: "Shadow_Gamer",
      email: "shadow@example.com",
      games: 15,
      spent: "$899.99",
      joined: "2024-09-05",
    },
  ]);

  const [reviews] = useState([
    {
      id: "1",
      gameTitle: "Speed Racer Ultimate",
      author: "ProGamer123",
      rating: 5,
      comment: "Amazing game!",
      status: "approved",
    },
    {
      id: "2",
      gameTitle: "Battle Arena Champions",
      author: "GameMaster",
      rating: 4,
      comment: "Great gameplay",
      status: "approved",
    },
    {
      id: "3",
      gameTitle: "Galaxy Warriors",
      author: "Player_X",
      rating: 5,
      comment: "Spectacular graphics",
      status: "pending",
    },
    {
      id: "4",
      gameTitle: "Pool Master Pro",
      author: "Shadow_Gamer",
      rating: 4,
      comment: "Very fun",
      status: "pending",
    },
  ]);

  const handleAddGame = () => {
    setEditingGame(null);
    setFormData({
      title: "",
      price: 0,
      image: "",
      description: "",
      category: "",
      rating: 0,
    });
    setShowGameForm(true);
  };

  const handleEditGame = (game: Game) => {
    setEditingGame(game);
    setFormData(game);
    setShowGameForm(true);
  };

  const handleSaveGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGame) {
      setGames(
        games.map((g) =>
          g.id === editingGame.id ? { ...formData, id: editingGame.id } : g
        )
      );
    } else {
      setGames([...games, { ...formData, id: Date.now().toString() }]);
    }
    setShowGameForm(false);
    setFormData({
      title: "",
      price: 0,
      image: "",
      description: "",
      category: "",
      rating: 0,
    });
  };

  const handleDeleteGame = (id: string) => {
    setGames(games.filter((g) => g.id !== id));
  };

  const totalRevenue = games.reduce((sum, g) => sum + g.price, 0);
  const totalUsers = users.length;
  const averageRating = (
    games.reduce((sum, g) => sum + g.rating, 0) / games.length
  ).toFixed(1);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>ADMIN DASHBOARD</h1>
        <p>Manage games, users, and content</p>
      </div>

      <div className="admin-container">
        <nav className="admin-nav">
          <button
            className={`admin-nav-btn ${
              activeTab === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart3 size={20} />
            Dashboard
          </button>
          <button
            className={`admin-nav-btn ${activeTab === "games" ? "active" : ""}`}
            onClick={() => setActiveTab("games")}
          >
            <ShoppingBag size={20} />
            Games
          </button>
          <button
            className={`admin-nav-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={20} />
            Users
          </button>
          <button
            className={`admin-nav-btn ${
              activeTab === "reviews" ? "active" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            <Star size={20} />
            Reviews
          </button>
        </nav>

        <main className="admin-content">
          {activeTab === "dashboard" && (
            <div className="admin-section">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <ShoppingBag />
                  </div>
                  <div className="stat-details">
                    <h3>{games.length}</h3>
                    <p>Total Games</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <Users />
                  </div>
                  <div className="stat-details">
                    <h3>{totalUsers}</h3>
                    <p>Active Users</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <Star />
                  </div>
                  <div className="stat-details">
                    <h3>${totalRevenue.toFixed(2)}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <BarChart3 />
                  </div>
                  <div className="stat-details">
                    <h3>★ {averageRating}</h3>
                    <p>Avg Rating</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <h3>Recent Games</h3>
                  <div className="recent-list">
                    {games.slice(0, 5).map((game) => (
                      <div key={game.id} className="recent-item">
                        <img src={game.image} alt={game.title} />
                        <div>
                          <p>{game.title}</p>
                          <span>${game.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dashboard-card">
                  <h3>Quick Stats</h3>
                  <div className="quick-stats">
                    <div className="quick-stat">
                      <span>Games by Category</span>
                      <ul>
                        {Array.from(new Set(games.map((g) => g.category))).map(
                          (cat) => (
                            <li key={cat}>
                              {cat}:{" "}
                              {games.filter((g) => g.category === cat).length}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "games" && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Game Management</h2>
                <button className="btn-add" onClick={handleAddGame}>
                  <Plus size={20} />
                  Add Game
                </button>
              </div>

              {showGameForm && (
                <form className="game-form" onSubmit={handleSaveGame}>
                  <div className="form-group">
                    <label>Game Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: parseFloat(e.target.value),
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        required
                      >
                        <option>Racing</option>
                        <option>Fighting</option>
                        <option>Action</option>
                        <option>RPG</option>
                        <option>Sports</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Rating</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rating: parseFloat(e.target.value),
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-save">
                      {editingGame ? "Update Game" : "Add Game"}
                    </button>
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => setShowGameForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="games-table">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {games.map((game) => (
                      <tr key={game.id}>
                        <td>
                          <div className="game-cell">
                            <img src={game.image} alt={game.title} />
                            <span>{game.title}</span>
                          </div>
                        </td>
                        <td>{game.category}</td>
                        <td>${game.price.toFixed(2)}</td>
                        <td>★ {game.rating}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-edit"
                              onClick={() => handleEditGame(game)}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDeleteGame(game.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="admin-section">
              <h2>User Management</h2>
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Games Owned</th>
                      <th>Total Spent</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.games}</td>
                        <td>{user.spent}</td>
                        <td>{user.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="admin-section">
              <h2>Review Management</h2>
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <h4>{review.gameTitle}</h4>
                      <span className={`review-status ${review.status}`}>
                        {review.status === "approved"
                          ? "✓ Approved"
                          : "⏳ Pending"}
                      </span>
                    </div>
                    <p className="review-author">{review.author}</p>
                    <p className="review-rating">
                      Rating: {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
