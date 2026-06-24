import { Gamepad2, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <Gamepad2 size={32} />
            <span>GAME STUDIO</span>
          </div>
          <p className="footer-tagline">
            Creating unforgettable gaming experiences since 2024
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-icon">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-icon">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>GAMES</h3>
          <ul>
            <li>
              <a href="/games">All Games</a>
            </li>
            <li>
              <a href="/games">New Releases</a>
            </li>
            <li>
              <a href="/games">Coming Soon</a>
            </li>
            <li>
              <a href="/games">Top Rated</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>COMPANY</h3>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>SUPPORT</h3>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Cookie Policy</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Game Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}
