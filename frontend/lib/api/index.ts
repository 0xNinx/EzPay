/**
 * API Services Index
 * Exports all API services for easy importing
 */

export { apiClient, ApiClient } from './client';
export { merchantsApi, type Merchant, type CreateMerchantRequest, type UpdateMerchantRequest } from './merchants';
export { paymentsApi, type Payment, type CreatePaymentRequest, type PaymentRequest, type CreatePaymentRequestData } from './payments';
