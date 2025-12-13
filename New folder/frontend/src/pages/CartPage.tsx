import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useRouter } from "../context/RouterContext";
import "./CartPage.css";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const { navigate } = useRouter();

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

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(({ game, quantity }) => (
              <div key={game.id} className="cart-item">
                <img src={game.image} alt={game.title} />
                <div className="item-details">
                  <h3>{game.title}</h3>
                  <p className="item-category">{game.category}</p>
                  <p className="item-price">${game.price}</p>
                </div>
                <div className="item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(game.id, quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(game.id, quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="item-total">
                  ${(game.price * quantity).toFixed(2)}
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
              <span>Subtotal</span>
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
            <button className="btn-checkout">PROCEED TO CHECKOUT</button>
            <button className="btn-continue" onClick={() => navigate("games")}>
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
