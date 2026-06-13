use soroban_sdk::{symbol_short, Address, BytesN, Env};

use crate::types::{MerchantData, PaymentRequest};

pub fn emit_merchant_registered(env: &Env, merchant: &Address, data: &MerchantData) {
    env.events()
        .publish((symbol_short!("mrch_reg"), merchant.clone()), data.clone());
}

pub fn emit_merchant_updated(env: &Env, merchant: &Address, data: &MerchantData) {
    env.events()
        .publish((symbol_short!("mrch_upd"), merchant.clone()), data.clone());
}

pub fn emit_merchant_deactivated(env: &Env, merchant: &Address) {
    env.events()
        .publish((symbol_short!("mrch_off"), merchant.clone()), ());
}

pub fn emit_payment_request_created(env: &Env, id: &BytesN<32>, data: &PaymentRequest) {
    env.events()
        .publish((symbol_short!("pay_req"), id.clone()), data.clone());
}

pub fn emit_payment_completed(
    env: &Env,
    id: &BytesN<32>,
    payer: &Address,
    token: &Address,
    net_amount: i128,
    fee_amount: i128,
) {
    env.events().publish(
        (symbol_short!("pay_done"), id.clone(), payer.clone()),
        (net_amount, fee_amount, token.clone()),
    );
}

pub fn emit_payment_request_cancelled(env: &Env, id: &BytesN<32>, merchant: &Address) {
    env.events()
        .publish((symbol_short!("pay_cncl"), id.clone()), merchant.clone());
}

pub fn emit_admin_changed(env: &Env, new_admin: &Address) {
    env.events()
        .publish((symbol_short!("adm_chng"),), new_admin.clone());
}

pub fn emit_fee_updated(env: &Env, fee_recipient: &Address, fee_bpm: u32) {
    env.events()
        .publish((symbol_short!("fee_upd"),), (fee_recipient.clone(), fee_bpm));
}

pub fn emit_paused(env: &Env) {
    env.events().publish((symbol_short!("paused"),), ());
}

pub fn emit_unpaused(env: &Env) {
    env.events().publish((symbol_short!("unpaused"),), ());
}

pub fn emit_upgraded(env: &Env, new_wasm_hash: &BytesN<32>) {
    env.events()
        .publish((symbol_short!("upgraded"),), new_wasm_hash.clone());
}
