import type { User, AuthResponse, RegisterRequest } from '../types/auth';
import { api } from './api';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      return response.data;
    } catch {
      // 模拟登录，实际应用中应该调用真实API
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: '管理员',
          email: 'admin@example.com',
          phone: '13800138000',
          avatar: '/default-avatar.png',
          address: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return {
          user: mockUser,
          token: 'mock-jwt-token',
        };
      }
      throw new Error('邮箱或密码错误');
    }
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      return response.data;
    } catch {
      // 模拟注册
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        avatar: '/default-avatar.png',
        address: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        user: mockUser,
        token: 'mock-jwt-token',
      };
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch {
      // 模拟获取当前用户
      const mockUser: User = {
        id: '1',
        name: '管理员',
        email: 'admin@example.com',
        phone: '13800138000',
        avatar: '/default-avatar.png',
        address: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return mockUser;
    }
  },

  async updateUser(userData: Partial<User>): Promise<User> {
    const response = await api.put<User>('/auth/profile', userData);
    if (response.data) {
      return response.data;
    }
    // 模拟更新用户信息
    const currentUser = await this.getCurrentUser();
    return { ...currentUser, ...userData };
  },

  logout(): void {
    // 清除本地存储的token等信息
    localStorage.removeItem('token');
  },
}; 