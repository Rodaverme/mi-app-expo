export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthSession {
  accessToken: string;
  user: User;
}
