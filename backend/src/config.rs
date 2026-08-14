// Application configuration
use serde::Deserialize;
use std::env;

#[derive(Debug, Deserialize)]
pub struct Config {
    pub database: DatabaseConfig,
    pub server: ServerConfig,
    pub stellar: StellarConfig,
}

#[derive(Debug, Deserialize)]
pub struct DatabaseConfig {
    pub url: String,
    pub max_connections: u32,
}

#[derive(Debug, Deserialize)]
pub struct ServerConfig {
    pub host: String,
    pub port: u16,
}

#[derive(Debug, Deserialize)]
pub struct StellarConfig {
    pub network: String,
    pub horizon_url: String,
    pub network_passphrase: String,
}

impl Config {
    pub fn from_env() -> Result<Self, env::VarError> {
        Ok(Config {
            database: DatabaseConfig {
                url: env::var("DATABASE_URL")?,
                max_connections: env::var("DATABASE_MAX_CONNECTIONS")
                    .ok()
                    .and_then(|v| v.parse().ok())
                    .unwrap_or(5),
            },
            server: ServerConfig {
                host: env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string()),
                port: env::var("PORT")
                    .ok()
                    .and_then(|v| v.parse().ok())
                    .unwrap_or(3001),
            },
            stellar: StellarConfig {
                network: env::var("STELLAR_NETWORK").unwrap_or_else(|_| "testnet".to_string()),
                horizon_url: env::var("STELLAR_HORIZON_URL")
                    .unwrap_or_else(|_| "https://horizon-testnet.stellar.org".to_string()),
                network_passphrase: env::var("STELLAR_NETWORK_PASSPHRASE")
                    .unwrap_or_else(|_| "Test SDF Network ; September 2015".to_string()),
            },
        })
    }
}
