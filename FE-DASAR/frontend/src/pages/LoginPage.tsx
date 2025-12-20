import { useState } from "react";
import { Gamepad2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "../context/RouterContext";
import "./LoginPage.css";

export default function LoginPage() {
  const { login, register, error } = useAuth();
  const { navigate } = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setIsLoading(true);

    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          setLocalError("Passwords do not match");
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setLocalError("Password must be at least 6 characters");
          setIsLoading(false);
          return;
        }
        const success = await register(username, email, password);
        if (success) {
          navigate("home");
        }
      } else {
        const success = await login(email, password);
        if (success) {
          navigate("home");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Gamepad2 size={64} />
          <h1>GAME STUDIO</h1>
          <p>{isRegister ? "Create your gaming account" : "Sign in to continue your gaming journey"}</p>
        </div>

        {(error || localError) && (
          <div className="error-message">
            {localError || error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {!isRegister && (
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>
          )}

          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading ? "LOADING..." : (isRegister ? "SIGN UP" : "SIGN IN")}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(!isRegister); setLocalError(""); }}>
              {isRegister ? "Sign in" : "Sign up"}
            </a>
          </p>
        </div>

        <div className="social-login">
          <div className="divider">
            <span>OR CONTINUE WITH</span>
          </div>
          <div className="social-buttons">
            <button className="social-btn">
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              Google
            </button>
            <button className="social-btn">
              <img src="https://www.facebook.com/favicon.ico" alt="Facebook" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
