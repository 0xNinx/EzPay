use axum::{Json, Router};
use axum::routing::{get, post, put, delete};
use uuid::Uuid;
use crate::models::merchant::{CreateMerchant, UpdateMerchant, Merchant};

pub fn merchant_routes() -> Router {
    Router::new()
        .route("/merchants", post(create_merchant))
        .route("/merchants/:id", get(get_merchant))
        .route("/merchants/:id", put(update_merchant))
        .route("/merchants/:id", delete(deactivate_merchant))
        .route("/merchants/me", get(get_current_merchant))
}

async fn create_merchant(Json(_payload): Json<CreateMerchant>) -> Json<Merchant> {
    // TODO: Implement merchant creation logic
    // This is a stub for contributors to implement
    todo!("Implement merchant creation with database insertion")
}

async fn get_merchant(axum::extract::Path(id): axum::extract::Path<Uuid>) -> Json<Merchant> {
    // TODO: Implement merchant retrieval logic
    todo!("Implement merchant retrieval from database")
}

async fn update_merchant(
    axum::extract::Path(id): axum::extract::Path<Uuid>,
    Json(_payload): Json<UpdateMerchant>,
) -> Json<Merchant> {
    // TODO: Implement merchant update logic
    todo!("Implement merchant update in database")
}

async fn deactivate_merchant(axum::extract::Path(id): axum::extract::Path<Uuid>) -> Json<()> {
    // TODO: Implement merchant deactivation logic
    todo!("Implement merchant deactivation")
}

async fn get_current_merchant() -> Json<Merchant> {
    // TODO: Implement current merchant retrieval (requires auth)
    todo!("Implement current merchant retrieval with authentication")
}
