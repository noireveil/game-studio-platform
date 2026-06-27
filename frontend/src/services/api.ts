/// <reference types="vite/client" />

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Helper function to get auth token
const getToken = () => localStorage.getItem('auth_token');

// Helper function for API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || data.errors?.email?.[0] || data.errors?.password?.[0] || 'API request failed');
  }

  // Return the data property if it exists (Laravel wraps responses in data)
  return data.data !== undefined ? data.data : data;
}

// Auth API
export const authAPI = {
  register: (username: string, email: string, password: string) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: username, email, password, password_confirmation: password }),
    }),

  login: (email: string, password: string) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiRequest('/auth/logout', {
      method: 'POST',
    }),

  me: () => apiRequest('/auth/me'),

  updateProfile: (username: string) =>
    apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ name: username }),
    }),
};

// Games API
export const gamesAPI = {
  getAll: () => apiRequest('/games'),

  getById: (id: string | number) => apiRequest(`/games/${id}`),

  // Admin only
  create: (gameData: {
    title: string;
    description?: string;
    price: number;
    image?: string;
    category?: string;
    features?: string[];
    is_visible?: boolean;
  }) =>
    apiRequest('/admin/games', {
      method: 'POST',
      body: JSON.stringify(gameData),
    }),

  // Admin only
  update: (id: string | number, gameData: {
    title?: string;
    description?: string;
    price?: number;
    image?: string;
    category?: string;
    rating?: number;
    features?: string[];
    is_visible?: boolean;
  }) =>
    apiRequest(`/admin/games/${id}`, {
      method: 'PUT',
      body: JSON.stringify(gameData),
    }),

  // Admin only
  delete: (id: string | number) =>
    apiRequest(`/admin/games/${id}`, {
      method: 'DELETE',
    }),
};

// Reviews API
export const reviewsAPI = {
  getByGame: (gameId: string | number) => apiRequest(`/games/${gameId}/reviews`),

  create: (gameId: string | number, rating: number, comment: string) =>
    apiRequest(`/games/${gameId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({ rating, comment }),
    }),

  delete: (gameId: string | number, reviewId: string | number) =>
    apiRequest(`/games/${gameId}/reviews/${reviewId}`, {
      method: 'DELETE',
    }),
};

// Purchases API
export const purchasesAPI = {
  getMyPurchases: () => apiRequest('/purchases'),

  purchase: (gameId: string | number) =>
    apiRequest('/purchases', {
      method: 'POST',
      body: JSON.stringify({ game_id: gameId }),
    }),

  checkout: (gameIds: (string | number)[]) =>
    apiRequest('/purchases/checkout', {
      method: 'POST',
      body: JSON.stringify({ game_ids: gameIds }),
    }),

  checkOwnership: (gameId: string | number) =>
    apiRequest(`/purchases/check/${gameId}`),
};

// Admin API
export const adminAPI = {
  getDashboard: () => apiRequest('/admin/dashboard'),
  
  getUsers: () => apiRequest('/admin/users'),

  deleteUser: (userId: string | number) =>
    apiRequest(`/admin/users/${userId}`, {
      method: 'DELETE',
    }),

  updateUserRole: (userId: string | number, role: string) =>
    apiRequest(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    }),

  getAllReviews: () => apiRequest('/admin/reviews'),

  deleteReview: (reviewId: string | number) =>
    apiRequest(`/admin/reviews/${reviewId}`, {
      method: 'DELETE',
    }),

  getAllGames: () => apiRequest('/admin/games'),
};

export default {
  auth: authAPI,
  games: gamesAPI,
  reviews: reviewsAPI,
  purchases: purchasesAPI,
  admin: adminAPI,
};
