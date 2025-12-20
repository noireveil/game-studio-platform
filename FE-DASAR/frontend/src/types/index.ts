export interface Game {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  features: string[];
  is_visible?: boolean;
}

export interface CartItem {
  game: Game;
}

export interface Review {
  id: string;
  game_id: string;
  user_id: string;
  user?: {
    id: string;
    username: string;
  };
  rating: number;
  content: string;
  created_at: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  purchases?: Purchase[];
}

export interface Purchase {
  id: string;
  user_id: string;
  game_id: string;
  price_at_purchase: number;
  created_at: string;
  game?: Game;
}
