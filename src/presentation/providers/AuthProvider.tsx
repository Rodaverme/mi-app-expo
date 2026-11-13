import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { LoginCredentials } from '@/domain/datasources/auth.datasource';
import { AuthRepository } from '@/domain/repositories/auth.repository';
import { AuthSession, User } from '@/domain/entities/user.entity';

interface AuthContextValue {
  session: AuthSession | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login(credentials: LoginCredentials): Promise<void>;
  logout(): void;
}

interface AuthProviderProps extends PropsWithChildren {
  authRepository: AuthRepository;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ authRepository, children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      try {
        setSession(await authRepository.login(credentials));
      } finally {
        setIsLoading(false);
      }
    },
    [authRepository]
  );

  const logout = useCallback(() => setSession(null), []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      isAuthenticated: session !== null,
      isLoading,
      login,
      logout,
    }),
    [session, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.');
  }
  return context;
}
