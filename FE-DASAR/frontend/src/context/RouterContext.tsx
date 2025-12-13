import { createContext, useContext, useState, ReactNode } from "react";

type Page =
  | "home"
  | "games"
  | "about"
  | "user"
  | "login"
  | "cart"
  | "game-details";

interface RouterContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
  gameId: string | null;
  setGameId: (id: string | null) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [gameId, setGameId] = useState<string | null>(null);

  const navigate = (page: Page) => {
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
