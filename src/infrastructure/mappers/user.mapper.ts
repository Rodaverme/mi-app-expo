import { AuthSession } from '@/domain/entities/user.entity';
import { AuthResponse } from '@/infrastructure/models/auth.response';

export function mapAuthResponseToSession(response: AuthResponse): AuthSession {
  return {
    accessToken: response.accessToken,
    user: {
      id: String(response.user.id),
      name: response.user.name,
      email: response.user.email,
    },
  };
}
