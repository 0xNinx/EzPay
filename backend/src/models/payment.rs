use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Payment {
    pub id: Uuid,
    pub merchant_id: Uuid,
    pub from_address: String,
    pub amount: i64,
    pub fee: i64,
    pub status: PaymentStatus,
    pub memo: Option<String>,
    pub transaction_hash: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "payment_status", rename_all = "lowercase")]
pub enum PaymentStatus {
    Pending,
    Completed,
    Failed,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreatePayment {
    pub merchant_id: Uuid,
    pub from_address: String,
    pub amount: i64,
    pub memo: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct PaymentRequest {
    pub id: Uuid,
    pub merchant_id: Uuid,
    pub token: String,
    pub amount: i64,
    pub memo: String,
    pub status: PaymentRequestStatus,
    pub expires_at: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "payment_request_status", rename_all = "lowercase")]
pub enum PaymentRequestStatus {
    Pending,
    Paid,
    Cancelled,
}
