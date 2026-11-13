import { AuthSession } from '@/domain/entities/user.entity';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthDataSource {
  login(credentials: LoginCredentials): Promise<AuthSession>;
}
