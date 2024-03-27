interface TokenData {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

interface UserDetails {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

interface Todo {
  _id: string;
  todo: string;
  done: boolean;
  userId: string;
  created_at: string;
}
