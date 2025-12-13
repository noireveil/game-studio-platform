import { User, Mail, Calendar, Award, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "../context/RouterContext";
import "./UserPage.css";

export default function UserPage() {
  const { user, isAuthenticated } = useAuth();
  const { navigate } = useRouter();

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
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <User size={80} />
            )}
          </div>
          <div className="user-info">
            <h1>{user.name}</h1>
            <p className="user-email">
              <Mail size={20} />
              {user.email}
            </p>
            <p className="user-joined">
              <Calendar size={20} />
              Member since December 2024
            </p>
          </div>
        </div>

        <div className="user-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <ShoppingBag size={32} />
            </div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Games Owned</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Award size={32} />
            </div>
            <div className="stat-info">
              <h3>47</h3>
              <p>Achievements</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <User size={32} />
            </div>
            <div className="stat-info">
              <h3>8</h3>
              <p>Reviews Written</p>
            </div>
          </div>
        </div>

        <div className="user-sections">
          <div className="section-card">
            <h2>RECENT ACTIVITY</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">🎮</div>
                <div className="activity-details">
                  <p className="activity-title">
                    Purchased Speed Racer Ultimate
                  </p>
                  <p className="activity-date">2 days ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">⭐</div>
                <div className="activity-details">
                  <p className="activity-title">
                    Reviewed Battle Arena Champions
                  </p>
                  <p className="activity-date">5 days ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🏆</div>
                <div className="activity-details">
                  <p className="activity-title">
                    Unlocked "Speed Demon" achievement
                  </p>
                  <p className="activity-date">1 week ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🎮</div>
                <div className="activity-details">
                  <p className="activity-title">Purchased Galaxy Warriors</p>
                  <p className="activity-date">2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h2>MY LIBRARY</h2>
            <div className="library-grid">
              <div className="library-item">
                <img
                  src="https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Game"
                />
                <p>Speed Racer Ultimate</p>
              </div>
              <div className="library-item">
                <img
                  src="https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Game"
                />
                <p>Battle Arena Champions</p>
              </div>
              <div className="library-item">
                <img
                  src="https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Game"
                />
                <p>Galaxy Warriors</p>
              </div>
              <div className="library-item">
                <img
                  src="https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Game"
                />
                <p>Pool Master Pro</p>
              </div>
            </div>
            <button className="btn-view-all" onClick={() => navigate("games")}>
              VIEW ALL GAMES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
