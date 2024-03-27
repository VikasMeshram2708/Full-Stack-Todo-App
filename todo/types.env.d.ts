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
