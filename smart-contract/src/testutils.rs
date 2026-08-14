#[cfg(test)]
use soroban_sdk::{Address, Env};

use crate::{EzPayContract, ContractError};

pub fn create_test_env() -> Env {
    Env::default()
}

pub fn register_test_admin(env: &Env) -> Address {
    let admin = Address::generate(env);
    let fee_recipient = Address::generate(env);
    let fee_bpm = 100; // 1% fee

    EzPayContract::initialize(env.clone(), admin.clone(), fee_recipient, fee_bpm).unwrap();
    
    admin
}
