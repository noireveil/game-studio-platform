import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../types";
import { AuthContext } from "./AuthContext";
import { authAPI } from "../services/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      authAPI.me()
        .then(response => {
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
        .finally(() => setTimeout(() => setLoading(false), 0));
    } else {
      setTimeout(() => setLoading(false), 0);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await authAPI.login(email, password);
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