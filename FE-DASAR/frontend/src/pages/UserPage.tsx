import { useState, useEffect } from "react";
import { User, Mail, Calendar, Award, ShoppingBag, Edit2, X, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "../context/RouterContext";
import { purchasesAPI } from "../services/api";
import { Purchase } from "../types";
import "./UserPage.css";

export default function UserPage() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { navigate, setGameId } = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadPurchases();
    }
  }, [isAuthenticated]);

  const loadPurchases = async () => {
    try {
      const response = await purchasesAPI.getMyPurchases();
      // Response is already unwrapped - it's the array directly
      const purchasesArray = Array.isArray(response) ? response : [];
      setPurchases(purchasesArray);
    } catch (err) {
      console.error('Failed to load purchases:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setNewUsername(user?.username || "");
    setIsEditing(true);
    setUpdateError("");
    setUpdateSuccess(false);
  };

  const handleSaveUsername = async () => {
    if (!newUsername.trim()) {
      setUpdateError("Username cannot be empty");
      return;
    }

    const success = await updateProfile(newUsername);
    if (success) {
      setIsEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } else {
      setUpdateError("Failed to update username");
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="user-page">
        <div className="error-container">
          <h2>Please login to view your profile</h2>
          <button
            className="btn-login-redirect"
            onClick={() => navigate("login")}
          >
            GO TO LOGIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-page">
      <div className="user-container">
        <div className="user-hero">
          <div className="user-avatar">
            <User size={80} />
          </div>
          <div className="user-info">
            <div className="username-section">
              {isEditing ? (
                <div className="edit-username">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="username-input"
                    autoFocus
                  />
                  <button className="btn-save" onClick={handleSaveUsername}>
                    <Check size={20} />
                  </button>
                  <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="display-username">
                  <h1>{user.username}</h1>
                  <button className="btn-edit" onClick={handleEditClick}>
                    <Edit2 size={20} />
                  </button>
                </div>
              )}
              {updateError && <p className="update-error">{updateError}</p>}
              {updateSuccess && <p className="update-success">Username updated!</p>}
            </div>
            <p className="user-email">
              <Mail size={20} />
              {user.email}
            </p>
            <p className="user-joined">
              <Calendar size={20} />
              Member since December 2025
            </p>
            {user.role === 'admin' && (
              <p className="user-role admin-badge">
                <Award size={20} />
                Administrator
              </p>
            )}
          </div>
        </div>

        <div className="user-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <ShoppingBag size={32} />
            </div>
            <div className="stat-info">
              <h3>{purchases.length}</h3>
              <p>Games Owned</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Award size={32} />
            </div>
            <div className="stat-info">
              <h3>${purchases.reduce((sum, p) => sum + Number(p.price_at_purchase || 0), 0).toFixed(2)}</h3>
              <p>Total Spent</p>
            </div>
          </div>
        </div>

        <div className="user-sections">
          <div className="section-card full-width">
            <h2>MY LIBRARY</h2>
            {loading ? (
              <p className="loading-text">Loading your games...</p>
            ) : purchases.length === 0 ? (
              <div className="empty-library">
                <ShoppingBag size={48} />
                <p>You haven't purchased any games yet</p>
                <button className="btn-browse" onClick={() => navigate("games")}>
                  BROWSE GAMES
                </button>
              </div>
            ) : (
              <div className="library-grid">
                {purchases.map((purchase) => (
                  <div 
                    key={purchase.id} 
                    className="library-item" 
                    onClick={() => {
                      setGameId(String(purchase.game_id));
                      navigate("game-details");
                    }}
                  >
                    <img
                      src={purchase.game?.image || "https://via.placeholder.com/400x200"}
                      alt={purchase.game?.title || "Game"}
                    />
                    <div className="library-item-info">
                      <p className="game-title">{purchase.game?.title || "Unknown Game"}</p>
                      <p className="purchase-date">Purchased: {new Date(purchase.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
