import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  ShoppingBag,
  Star,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "../context/RouterContext";
import { adminAPI, gamesAPI } from "../services/api";
import type { Game } from "../types";
import "./AdminPage.css";

interface DashboardStats {
  totalGames: number;
  totalUsers: number;
  totalPurchases: number;
  totalReviews: number;
  revenue: number;
}

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  purchases_count: number;
  created_at: string;
}

interface AdminReview {
  id: string;
  author: string;
  gameTitle: string;
  rating: number;
  comment: string;
  date: string;
}

type TabType = "dashboard" | "games" | "users" | "reviews";

export default function AdminPage() {
  const { isAdmin, isAuthenticated, loading: authLoading } = useAuth();
  const { navigate } = useRouter();

  const [games, setGames] = useState<(Game & { is_visible: boolean })[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [loading, setLoading] = useState(true);

  const [showGameForm, setShowGameForm] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    image: "",
    description: "",
    category: "Action",
    rating: 0,
    features: [] as string[],
    is_visible: true,
  });
  const [featuresInput, setFeaturesInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;
    
    if (!isAuthenticated) {
      navigate("login");
      return;
    }
    if (!isAdmin) {
      navigate("home");
      return;
    }
    loadData();
  }, [isAuthenticated, isAdmin, authLoading]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [dashboardRes, gamesRes, usersRes, reviewsRes] = await Promise.all([
        adminAPI.getDashboard(),
        adminAPI.getAllGames(),
        adminAPI.getUsers(),
        adminAPI.getAllReviews(),
      ]);

      console.log("Admin API responses:", { dashboardRes, gamesRes, usersRes, reviewsRes });

      // Response is already unwrapped by API service
      setStats({
        totalGames: dashboardRes?.totalGames || 0,
        totalUsers: dashboardRes?.totalUsers || 0,
        totalPurchases: dashboardRes?.totalPurchases || 0,
        totalReviews: dashboardRes?.totalReviews || 0,
        revenue: dashboardRes?.totalSales || 0,
      });
      
      const gamesArray = Array.isArray(gamesRes) ? gamesRes : [];
      setGames(
        gamesArray.map((g: any) => ({
          id: String(g.id),
          title: g.title,
          description: g.description || "",
          price: Number(g.price),
          image: g.image || "",
          category: g.category || "Action",
          rating: Number(g.rating) || 0,
          features: g.features || [],
          is_visible: g.is_visible,
        }))
      );
      
      const usersArray = Array.isArray(usersRes) ? usersRes : [];
      setUsers(
        usersArray.map((u: any) => ({
          id: String(u.id),
          username: u.name || u.username,
          email: u.email,
          role: u.role || 'user',
          purchases_count: u.games || u.purchases_count || 0,
          created_at: u.joined || u.created_at,
        }))
      );
      
      const reviewsArray = Array.isArray(reviewsRes) ? reviewsRes : [];
      setReviews(reviewsArray);
    } catch (err) {
      console.error("Failed to load admin data:", err);
      setError(err instanceof Error ? err.message : "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddGame = () => {
    setEditingGame(null);
    setFormData({
      title: "",
      price: 0,
      image: "",
      description: "",
      category: "Action",
      rating: 0,
      features: [],
      is_visible: true,
    });
    setFeaturesInput("");
    setShowGameForm(true);
  };

  const handleEditGame = (game: Game & { is_visible: boolean }) => {
    setEditingGame(game);
    setFormData({
      title: game.title,
      price: game.price,
      image: game.image,
      description: game.description,
      category: game.category,
      rating: game.rating,
      features: game.features || [],
      is_visible: game.is_visible,
    });
    setFeaturesInput((game.features || []).join(", "));
    setShowGameForm(true);
  };

  const handleSaveGame = async (e: React.FormEvent) => {
    e.preventDefault();
    const features = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);

    try {
      if (editingGame) {
        await gamesAPI.update(editingGame.id, { ...formData, features });
      } else {
        await gamesAPI.create({ ...formData, features });
      }
      await loadData();
      setShowGameForm(false);
    } catch (err) {
      console.error("Failed to save game:", err);
    }
  };

  const handleDeleteGame = async (id: string) => {
    if (!confirm("Are you sure you want to delete this game?")) return;
    try {
      await gamesAPI.delete(id);
      await loadData();
    } catch (err) {
      console.error("Failed to delete game:", err);
    }
  };

  const handleToggleVisibility = async (game: Game & { is_visible: boolean }) => {
    try {
      await gamesAPI.update(game.id, { is_visible: !game.is_visible });
      await loadData();
    } catch (err) {
      console.error("Failed to toggle visibility:", err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This will also delete their reviews and purchases.")) return;
    try {
      await adminAPI.deleteUser(id);
      await loadData();
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user");
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await adminAPI.deleteReview(id);
      await loadData();
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert("Failed to delete review");
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <h1>ADMIN DASHBOARD</h1>
          <p>Checking authentication...</p>
        </div>
        <div className="loading-container">
          <h2>Verifying Admin Access</h2>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <h1>ADMIN DASHBOARD</h1>
          <p>Loading...</p>
        </div>
        <div className="loading-container">
          <h2>Loading Admin Dashboard...</h2>
          <p>Please wait while we fetch the data.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <h1>ADMIN DASHBOARD</h1>
          <p>Error occurred</p>
        </div>
        <div className="error-container">
          <h2>Error Loading Data</h2>
          <p>{error}</p>
          <button className="btn-add" onClick={loadData} style={{ marginTop: '1rem' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-page">
        <div className="error-container">
          <h2>Access Denied</h2>
          <p>You need administrator privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>ADMIN DASHBOARD</h1>
        <p>Manage games, users, and content</p>
      </div>

      <div className="admin-container">
        <nav className="admin-nav">
          <button
            className={`admin-nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
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
            className={`admin-nav-btn ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            <Star size={20} />
            Reviews
          </button>
        </nav>

        <main className="admin-content">
          {activeTab === "dashboard" && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Dashboard Overview</h2>
                <button className="btn-refresh" onClick={loadData}>
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <ShoppingBag />
                  </div>
                  <div className="stat-details">
                    <h3>{stats?.totalGames || 0}</h3>
                    <p>Total Games</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <Users />
                  </div>
                  <div className="stat-details">
                    <h3>{stats?.totalUsers || 0}</h3>
                    <p>Active Users</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <Star />
                  </div>
                  <div className="stat-details">
                    <h3>${Number(stats?.revenue ?? 0).toFixed(2)}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <BarChart3 />
                  </div>
                  <div className="stat-details">
                    <h3>{stats?.totalPurchases || 0}</h3>
                    <p>Total Sales</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <h3>Recent Games</h3>
                  <div className="recent-list">
                    {games.slice(0, 5).map((game) => (
                      <div key={game.id} className="recent-item">
                        <img src={game.image || "https://via.placeholder.com/50"} alt={game.title} />
                        <div>
                          <p>{game.title}</p>
                          <span>${game.price.toFixed(2)}</span>
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
                              {cat}: {games.filter((g) => g.category === cat).length}
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
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      >
                        <option>Racing</option>
                        <option>Fighting</option>
                        <option>Action</option>
                        <option>RPG</option>
                        <option>Sports</option>
                        <option>Adventure</option>
                        <option>Indie</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Visibility</label>
                      <select
                        value={formData.is_visible ? "visible" : "hidden"}
                        onChange={(e) => setFormData({ ...formData, is_visible: e.target.value === "visible" })}
                      >
                        <option value="visible">Visible (Public)</option>
                        <option value="hidden">Hidden (Private)</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Features (comma-separated)</label>
                    <input
                      type="text"
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      placeholder="Single-player, Multi-player, Open World"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-save">
                      {editingGame ? "Update Game" : "Add Game"}
                    </button>
                    <button type="button" className="btn-cancel" onClick={() => setShowGameForm(false)}>
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
                      <th>Visibility</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {games.map((game) => (
                      <tr key={game.id} className={!game.is_visible ? "hidden-game" : ""}>
                        <td>
                          <div className="game-cell">
                            <img src={game.image || "https://via.placeholder.com/50"} alt={game.title} />
                            <span>{game.title}</span>
                          </div>
                        </td>
                        <td>{game.category}</td>
                        <td>${game.price.toFixed(2)}</td>
                        <td>
                          <span className={`visibility-badge ${game.is_visible ? "visible" : "hidden"}`}>
                            {game.is_visible ? "Public" : "Hidden"}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-visibility"
                              onClick={() => handleToggleVisibility(game)}
                              title={game.is_visible ? "Hide game" : "Show game"}
                            >
                              {game.is_visible ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button className="btn-edit" onClick={() => handleEditGame(game)}>
                              <Edit2 size={16} />
                            </button>
                            <button className="btn-delete" onClick={() => handleDeleteGame(game.id)}>
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
              <div className="section-header">
                <h2>User Management</h2>
                <button className="btn-refresh" onClick={loadData}>
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>
              {users.length === 0 ? (
                <div className="no-data-container">
                  <p>No users found.</p>
                </div>
              ) : (
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Games Owned</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>{user.purchases_count}</td>
                          <td>{user.created_at}</td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="btn-delete" 
                                onClick={() => handleDeleteUser(user.id)}
                                title="Delete user"
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
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Review Management</h2>
                <button className="btn-refresh" onClick={loadData}>
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>
              <div className="reviews-list">
                {reviews.length === 0 ? (
                  <p className="no-reviews">No reviews yet</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-content">
                        <div className="review-header">
                          <h4>{review.gameTitle || "Unknown Game"}</h4>
                          <span className="review-date">
                            {review.date}
                          </span>
                        </div>
                        <p className="review-author">By: {review.author || "Anonymous"}</p>
                        <p className="review-rating">
                          Rating: {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                        </p>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                      <div className="review-actions">
                        <button 
                          className="btn-delete" 
                          onClick={() => handleDeleteReview(review.id)}
                          title="Delete review"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
