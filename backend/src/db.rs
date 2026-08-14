// Database configuration and connection pool
use sqlx::postgres::{PgPool, PgPoolOptions};
use std::env;

pub async fn create_pool() -> Result<PgPool, sqlx::Error> {
    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");

    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
}

#[cfg(test)]
pub mod test_utils {
    use super::*;

    pub async fn create_test_pool() -> Result<PgPool, sqlx::Error> {
        let database_url = env::var("TEST_DATABASE_URL")
            .unwrap_or_else(|_| "postgresql://postgres:password@localhost:5432/ezpay_test".to_string());

        PgPoolOptions::new()
            .max_connections(5)
            .connect(&database_url)
            .await
    }
}
