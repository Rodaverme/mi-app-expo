import { LoginCredentials } from '@/domain/datasources/auth.datasource';
import { AuthSession } from '@/domain/entities/user.entity';

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AuthSession>;
}
