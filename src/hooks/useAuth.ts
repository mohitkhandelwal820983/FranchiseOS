import { useState, useCallback } from 'react';
import { authAPI } from '../api/auth.api';

interface User {
  id: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login({ email, password });
      setUser(response.data.user);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authAPI.logout();
      setUser(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
