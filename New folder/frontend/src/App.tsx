import { RouterProvider, useRouter } from "./context/RouterContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";

function AppContent() {
  const { currentPage } = useRouter();

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "games":
        return <GamesPage />;
      case "game-details":
        return <GameDetailsPage />;
      case "about":
        return <AboutPage />;
      case "user":
        return <UserPage />;
      case "login":
        return <LoginPage />;
      case "cart":
        return <CartPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app">
      {currentPage !== "login" && <Header />}
      <main>{renderPage()}</main>
      {currentPage !== "login" && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
