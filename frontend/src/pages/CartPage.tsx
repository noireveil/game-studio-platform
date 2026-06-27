import { useState } from "react";
import { ShoppingCart, Trash2, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "../context/RouterContext";
import { purchasesAPI } from "../services/api";
import "./CartPage.css";

export default function CartPage() {
  const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { navigate } = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate("login");
      return;
    }

    setIsCheckingOut(true);
    setError("");

    try {
      const gameIds = cartItems.map((item) => item.game.id);
      await purchasesAPI.checkout(gameIds);
      setCheckoutSuccess(true);
      clearCart();
      
      // Redirect to user page after 2 seconds
      setTimeout(() => {
        navigate("user");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed. Some games may already be owned.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (checkoutSuccess) {
    return (
      <div className="cart-page">
        <div className="empty-cart success">
          <Check size={80} />
          <h2>Purchase Successful!</h2>
          <p>Your games have been added to your library</p>
          <button className="btn-shop" onClick={() => navigate("user")}>
            VIEW MY LIBRARY
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <ShoppingCart size={80} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any games yet</p>
          <button className="btn-shop" onClick={() => navigate("games")}>
            BROWSE GAMES
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>SHOPPING CART</h1>
          <button className="btn-clear" onClick={clearCart}>
            Clear All
          </button>
        </div>

        {error && <div className="cart-error">{error}</div>}

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(({ game }) => (
              <div key={game.id} className="cart-item">
                <img src={game.image} alt={game.title} />
                <div className="item-details">
                  <h3>{game.title}</h3>
                  <p className="item-category">{game.category}</p>
                </div>
                <div className="item-total">
                  ${game.price.toFixed(2)}
                </div>
                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(game.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>ORDER SUMMARY</h2>
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} game{cartItems.length !== 1 ? 's' : ''})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(totalPrice * 1.1).toFixed(2)}</span>
            </div>
            <button 
              className="btn-checkout" 
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "PROCESSING..." : (isAuthenticated ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT")}
            </button>
            <button className="btn-continue" onClick={() => navigate("games")}>
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
