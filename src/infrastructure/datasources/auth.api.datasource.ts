import { ApiClient } from '@/config/api/apiClient';
import { AuthDataSource, LoginCredentials } from '@/domain/datasources/auth.datasource';
import { AuthSession } from '@/domain/entities/user.entity';
import { mapAuthResponseToSession } from '@/infrastructure/mappers/user.mapper';
import { AuthResponse } from '@/infrastructure/models/auth.response';

export class AuthApiDataSource implements AuthDataSource {
  constructor(private readonly apiClient: ApiClient) {}

  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const response = await this.apiClient.post<AuthResponse, LoginCredentials>(
      '/auth/login',
      credentials
    );
    return mapAuthResponseToSession(response);
  }
}
