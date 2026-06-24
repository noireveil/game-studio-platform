import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";
import { authAPI } from "../services/api";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (username: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      authAPI.me()
        .then(response => {
          // response is already unwrapped (the data property from Laravel)
          setUser({
            id: String(response.id),
            username: response.name || response.username,
            email: response.email,
            role: response.role,
          });
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await authAPI.login(email, password);
      // response is already unwrapped { user: {...}, token: '...' }
      localStorage.setItem('auth_token', response.token);
      setUser({
        id: String(response.user.id),
        username: response.user.name || response.user.username,
        email: response.user.email,
        role: response.user.role,
      });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await authAPI.register(username, email, password);
      // response is already unwrapped { user: {...}, token: '...' }
      localStorage.setItem('auth_token', response.token);
      setUser({
        id: String(response.user.id),
        username: response.user.name || response.user.username,
        email: response.user.email,
        role: response.user.role,
      });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    authAPI.logout().catch(() => {});
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const updateProfile = async (username: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await authAPI.updateProfile(username);
      // response is already unwrapped
      setUser(prev => prev ? { ...prev, username: response.name || response.username || username } : null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        login, 
        register,
        logout, 
        updateProfile,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loading,
        error 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
