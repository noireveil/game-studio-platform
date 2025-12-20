export interface Game {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  features: string[];
}

export interface CartItem {
  game: Game;
  quantity: number;
}

export interface Review {
  id: string;
  gameId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
