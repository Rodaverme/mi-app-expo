export interface AuthResponse {
  accessToken: string;
  user: {
    id: string | number;
    name: string;
    email: string;
  };
}
