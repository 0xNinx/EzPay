/**
 * Payments API Service
 * Handles all payment-related API calls
 */

import { apiClient } from './client';

export interface Payment {
  id: string;
  merchantId: string;
  fromAddress: string;
  amount: number;
  fee: number;
  status: 'pending' | 'completed' | 'failed';
  memo?: string;
  transactionHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentRequest {
  merchantId: string;
  fromAddress: string;
  amount: number;
  memo?: string;
}

export interface PaymentRequest {
  id: string;
  merchantId: string;
  token: string;
  amount: number;
  memo: string;
  status: 'pending' | 'paid' | 'cancelled';
  expiresAt?: string;
  createdAt: string;
}

export interface CreatePaymentRequestData {
  merchantId: string;
  token: string;
  amount: number;
  memo: string;
  expiresIn?: number; // seconds
}

export const paymentsApi = {
  /**
   * Create a new payment
   */
  async create(data: CreatePaymentRequest): Promise<Payment> {
    return apiClient.post<Payment>('/api/payments', data);
  },

  /**
   * Get payment by ID
   */
  async getById(id: string): Promise<Payment> {
    return apiClient.get<Payment>(`/api/payments/${id}`);
  },

  /**
   * Get all payments for a merchant
   */
  async getByMerchant(merchantId: string, params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<Payment[]> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return apiClient.get<Payment[]>(`/api/payments?merchantId=${merchantId}${queryString ? `&${queryString}` : ''}`);
  },

  /**
   * Get payment history for current merchant
   */
  async getHistory(params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<Payment[]> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return apiClient.get<Payment[]>(`/api/payments/history${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Create a payment request (invoice)
   */
  async createRequest(data: CreatePaymentRequestData): Promise<PaymentRequest> {
    return apiClient.post<PaymentRequest>('/api/payment-requests', data);
  },

  /**
   * Get payment request by ID
   */
  async getRequestById(id: string): Promise<PaymentRequest> {
    return apiClient.get<PaymentRequest>(`/api/payment-requests/${id}`);
  },

  /**
   * Cancel a payment request
   */
  async cancelRequest(id: string): Promise<PaymentRequest> {
    return apiClient.post<PaymentRequest>(`/api/payment-requests/${id}/cancel`, {});
  },

  /**
   * Process a payment (pay a payment request)
   */
  async payRequest(requestId: string, fromAddress: string): Promise<Payment> {
    return apiClient.post<Payment>(`/api/payment-requests/${requestId}/pay`, { fromAddress });
  },
};
