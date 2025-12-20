import { Gamepad2, ShoppingCart, User, Settings } from "lucide-react";
import { useRouter } from "../context/RouterContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Header.css";

export default function Header() {
  const { navigate } = useRouter();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={() => navigate("home")}>
          <Gamepad2 size={32} />
          <span>GAME STUDIO</span>
        </div>

        <nav className="header-nav">
          <button onClick={() => navigate("home")}>HOME</button>
          <button onClick={() => navigate("games")}>GAMES</button>
          <button onClick={() => navigate("about")}>ABOUT</button>
        </nav>

        <div className="header-actions">
          <button className="icon-button" onClick={() => navigate("cart")}>
            <ShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
          {isAuthenticated ? (
            <>
              <button className="icon-button" onClick={() => navigate("user")}>
                <User size={24} />
              </button>
              {isAdmin && (
                <button
                  className="icon-button"
                  onClick={() => navigate("admin")}
                  title="Admin Panel"
                >
                  <Settings size={24} />
                </button>
              )}
              <button className="btn-secondary" onClick={logout}>
                LOGOUT
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => navigate("login")}>
              LOGIN
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
