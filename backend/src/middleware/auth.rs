// Authentication middleware
// TODO: Implement JWT-based authentication
use axum::{
    extract::Request,
    http::StatusCode,
    middleware::Next,
    response::Response,
};
use crate::middleware::AppError;

pub async fn auth_middleware(
    req: Request,
    next: Next,
) -> Result<Response, AppError> {
    // TODO: Extract and validate JWT token from Authorization header
    // TODO: Verify token signature and expiration
    // TODO: Extract user/merchant ID from token claims
    // TODO: Add user context to request extensions
    
    // For now, just pass through - contributors should implement proper auth
    Ok(next.run(req).await)
}

pub async fn require_auth() -> Result<(), AppError> {
    // TODO: Check if request has valid authentication
    todo!("Implement authentication check")
}
