/**
 * Merchant API Service
 * Handles all merchant-related API calls
 */

import { apiClient } from './client';

export interface Merchant {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  payoutMethod: 'wallet' | 'bank';
  bankAccount?: string;
  bankRoutingNumber?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMerchantRequest {
  name: string;
  email: string;
  password: string;
  walletAddress: string;
  payoutMethod: 'wallet' | 'bank';
  bankAccount?: string;
  bankRoutingNumber?: string;
}

export interface UpdateMerchantRequest {
  name?: string;
  payoutMethod?: 'wallet' | 'bank';
  bankAccount?: string;
  bankRoutingNumber?: string;
}

export const merchantsApi = {
  /**
   * Register a new merchant
   */
  async create(data: CreateMerchantRequest): Promise<Merchant> {
    return apiClient.post<Merchant>('/api/merchants', data);
  },

  /**
   * Get merchant by ID
   */
  async getById(id: string): Promise<Merchant> {
    return apiClient.get<Merchant>(`/api/merchants/${id}`);
  },

  /**
   * Get current merchant (authenticated)
   */
  async getCurrent(): Promise<Merchant> {
    return apiClient.get<Merchant>('/api/merchants/me');
  },

  /**
   * Update merchant information
   */
  async update(id: string, data: UpdateMerchantRequest): Promise<Merchant> {
    return apiClient.put<Merchant>(`/api/merchants/${id}`, data);
  },

  /**
   * Deactivate merchant account
   */
  async deactivate(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/merchants/${id}`);
  },

  /**
   * Get merchant dashboard statistics
   */
  async getStats(id: string): Promise<{
    totalRevenue: number;
    totalTransactions: number;
    activeCustomers: number;
    pendingPayouts: number;
  }> {
    return apiClient.get(`/api/merchants/${id}/stats`);
  },
};
