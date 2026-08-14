# EzPay API Documentation

This document describes the EzPay backend API endpoints.

## Base URL

```
http://localhost:3001/api
```

## Authentication

Most endpoints require authentication via JWT token in the Authorization header.

```
Authorization: Bearer <token>
```

## Endpoints

### Health

#### GET /api/health

Check API health status.

**Response:**
```json
{
  "status": "ok",
  "version": "0.1.0"
}
```

### Merchants

#### POST /api/merchants

Register a new merchant.

**Request Body:**
```json
{
  "name": "Merchant Name",
  "email": "merchant@example.com",
  "password": "securepassword",
  "wallet_address": "G...",
  "payout_method": "wallet",
  "bank_account": null,
  "bank_routing_number": null
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Merchant Name",
  "email": "merchant@example.com",
  "wallet_address": "G...",
  "payout_method": "wallet",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### GET /api/merchants/:id

Get merchant details by ID.

#### PUT /api/merchants/:id

Update merchant details.

#### DELETE /api/merchants/:id

Deactivate a merchant account.

#### GET /api/merchants/me

Get current authenticated merchant details.

### Payments

#### POST /api/payments

Create a new payment.

**Request Body:**
```json
{
  "merchant_id": "uuid",
  "from_address": "G...",
  "amount": 10000000,
  "memo": "Payment for services"
}
```

#### GET /api/payments/:id

Get payment details by ID.

#### GET /api/payments/history

Get payment history for authenticated merchant.

### Payment Requests

#### POST /api/payment-requests

Create a new payment request.

#### GET /api/payment-requests/:id

Get payment request details.

#### POST /api/payment-requests/:id/cancel

Cancel a payment request.

#### POST /api/payment-requests/:id/pay

Process payment for a payment request.

## Error Responses

All endpoints may return error responses:

```json
{
  "error": "Error message",
  "status": 400
}
```

Common status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
