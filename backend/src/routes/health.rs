use axum::{Json, Router};
use axum::routing::get;
use serde::Serialize;
use sqlx::PgPool;

#[derive(Serialize)]
struct HealthResponse {
    status: String,
    version: String,
    database: String,
}

pub fn health_routes() -> Router {
    Router::new().route("/health", get(health_check))
}

async fn health_check() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "ok".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        database: "not_connected".to_string(),
    })
}

pub fn health_routes_with_db(pool: PgPool) -> Router {
    Router::new().route("/health", get(move || health_check_with_db(pool)))
}

async fn health_check_with_db(pool: PgPool) -> Json<HealthResponse> {
    let db_status = match sqlx::query("SELECT 1").fetch_one(&pool).await {
        Ok(_) => "connected".to_string(),
        Err(_) => "disconnected".to_string(),
    };

    Json(HealthResponse {
        status: "ok".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        database: db_status,
    })
}
