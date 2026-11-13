import { AuthDataSource, LoginCredentials } from '@/domain/datasources/auth.datasource';
import { AuthSession } from '@/domain/entities/user.entity';
import { AuthRepository } from '@/domain/repositories/auth.repository';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly dataSource: AuthDataSource) {}

  login(credentials: LoginCredentials): Promise<AuthSession> {
    return this.dataSource.login(credentials);
  }
}
