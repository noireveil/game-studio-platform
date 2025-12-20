import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Page =
  | "home"
  | "games"
  | "about"
  | "user"
  | "login"
  | "cart"
  | "game-details"
  | "admin";

interface RouterContextType {
  currentPage: Page;
  navigate: (page: Page, id?: string) => void;
  gameId: string | null;
  setGameId: (id: string | null) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Map page names to URL paths
const pageToPath: Record<Page, string> = {
  home: "/",
  games: "/games",
  about: "/about",
  user: "/user",
  login: "/login",
  cart: "/cart",
  "game-details": "/game",
  admin: "/admin",
};

// Map URL paths to page names
const pathToPage: Record<string, Page> = {
  "/": "home",
  "/games": "games",
  "/about": "about",
  "/user": "user",
  "/login": "login",
  "/cart": "cart",
  "/game": "game-details",
  "/admin": "admin",
};

// Get initial page from URL
const getInitialPage = (): { page: Page; gameId: string | null } => {
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  const gameId = searchParams.get("id");
  
  // Check for game details path with ID
  if (path.startsWith("/game") && gameId) {
    return { page: "game-details", gameId };
  }
  
  const page = pathToPage[path] || "home";
  return { page, gameId: null };
};

export function RouterProvider({ children }: { children: ReactNode }) {
  const initial = getInitialPage();
  const [currentPage, setCurrentPage] = useState<Page>(initial.page);
  const [gameId, setGameId] = useState<string | null>(initial.gameId);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const { page, gameId: newGameId } = getInitialPage();
      setCurrentPage(page);
      if (newGameId) {
        setGameId(newGameId);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (page: Page, id?: string) => {
    let url = pageToPath[page];
    
    // Add game ID to URL if navigating to game details
    if (page === "game-details" && id) {
      url = `/game?id=${id}`;
      setGameId(id);
    } else if (id) {
      setGameId(id);
    }
    
    // Update browser URL
    window.history.pushState({ page, id }, "", url);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider
      value={{ currentPage, navigate, gameId, setGameId }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within RouterProvider");
  }
  return context;
}
