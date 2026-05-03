export interface User {
  id: string;
  username: string;
  color: string;
}

export interface Drawing {
  x: number;
  y: number;
  color: string;
  size: number;
  userId?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
