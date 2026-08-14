#![no_std]

mod admin;
mod errors;
mod events;
mod merchant;
mod payment;
mod storage;
mod types;

#[cfg(test)]
mod merchant_tests;

#[cfg(test)]
mod payment_tests;

#[cfg(test)]
mod admin_tests;

#[cfg(test)]
mod testutils;

pub use errors::ContractError;
pub use types::{MerchantData, PaymentRequest, PaymentStatus, PayoutMethod};

use soroban_sdk::{contract, contractimpl, Address, BytesN, Env, String};

#[contract]
pub struct EzPayContract;

#[contractimpl]
impl EzPayContract {
    pub fn initialize(
        env: Env,
        admin: Address,
        fee_recipient: Address,
        fee_bpm: u32,
    ) -> Result<(), ContractError> {
        admin::initialize(&env, admin, fee_recipient, fee_bpm)
    }

    pub fn set_admin(env: Env, new_admin: Address) -> Result<(), ContractError> {
        admin::set_admin(&env, new_admin)
    }

    pub fn set_fee(env: Env, fee_recipient: Address, fee_bpm: u32) -> Result<(), ContractError> {
        admin::set_fee(&env, fee_recipient, fee_bpm)
    }

    pub fn pause(env: Env) -> Result<(), ContractError> {
        admin::pause(&env)
    }

    pub fn unpause(env: Env) -> Result<(), ContractError> {
        admin::unpause(&env)
    }

    pub fn upgrade(env: Env, new_wasm_hash: BytesN<32>) -> Result<(), ContractError> {
        admin::upgrade(&env, new_wasm_hash)
    }

    pub fn get_admin(env: Env) -> Result<Address, ContractError> {
        admin::get_admin(&env)
    }

    pub fn get_fee_config(env: Env) -> Result<(Address, u32), ContractError> {
        admin::get_fee_config(&env)
    }

    pub fn register_merchant(
        env: Env,
        merchant: Address,
        name: String,
        wallet_address: Address,
        payout_method: PayoutMethod,
    ) -> Result<(), ContractError> {
        merchant::register_merchant(&env, merchant, name, wallet_address, payout_method)
    }

    pub fn update_merchant(
        env: Env,
        merchant: Address,
        name: String,
        wallet_address: Address,
        payout_method: PayoutMethod,
    ) -> Result<(), ContractError> {
        merchant::update_merchant(&env, merchant, name, wallet_address, payout_method)
    }

    pub fn deactivate_merchant(env: Env, merchant: Address) -> Result<(), ContractError> {
        merchant::deactivate_merchant(&env, merchant)
    }

    pub fn get_merchant(env: Env, merchant: Address) -> Result<MerchantData, ContractError> {
        merchant::get_merchant(&env, &merchant)
    }

    pub fn is_merchant_active(env: Env, merchant: Address) -> bool {
        merchant::is_merchant_active(&env, &merchant)
    }

    pub fn create_payment_request(
        env: Env,
        merchant: Address,
        token: Address,
        amount: i128,
        memo: String,
    ) -> Result<BytesN<32>, ContractError> {
        payment::create_payment_request(&env, merchant, token, amount, memo)
    }

    pub fn pay(
        env: Env,
        payer: Address,
        request_id: BytesN<32>,
        token: Address,
        amount: i128,
    ) -> Result<(), ContractError> {
        payment::pay(&env, payer, request_id, token, amount)
    }

    pub fn cancel_payment_request(
        env: Env,
        merchant: Address,
        request_id: BytesN<32>,
    ) -> Result<(), ContractError> {
        payment::cancel_payment_request(&env, merchant, request_id)
    }

    pub fn get_payment_request(
        env: Env,
        request_id: BytesN<32>,
    ) -> Result<PaymentRequest, ContractError> {
        payment::get_payment_request(&env, &request_id)
    }
}
