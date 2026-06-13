use soroban_sdk::{Address, BytesN, Env};

use crate::types::{InstanceKey, MerchantData, PaymentRequest, PersistentKey, TempKey};

const PERSISTENT_TTL_LEDGERS: u32 = 6_307_200;
const TEMP_TTL_LEDGERS: u32 = 120_960;

pub fn is_initialized(env: &Env) -> bool {
    env.storage()
        .instance()
        .get::<InstanceKey, bool>(&InstanceKey::Initialized)
        .unwrap_or(false)
}

pub fn set_initialized(env: &Env) {
    env.storage()
        .instance()
        .set(&InstanceKey::Initialized, &true);
}

pub fn get_admin(env: &Env) -> Option<Address> {
    env.storage()
        .instance()
        .get::<InstanceKey, Address>(&InstanceKey::Admin)
}

pub fn set_admin(env: &Env, admin: &Address) {
    env.storage().instance().set(&InstanceKey::Admin, admin);
}

pub fn get_fee_recipient(env: &Env) -> Option<Address> {
    env.storage()
        .instance()
        .get::<InstanceKey, Address>(&InstanceKey::FeeRecipient)
}

pub fn set_fee_recipient(env: &Env, recipient: &Address) {
    env.storage()
        .instance()
        .set(&InstanceKey::FeeRecipient, recipient);
}

pub fn get_fee_bpm(env: &Env) -> u32 {
    env.storage()
        .instance()
        .get::<InstanceKey, u32>(&InstanceKey::FeeBpm)
        .unwrap_or(0)
}

pub fn set_fee_bpm(env: &Env, bpm: u32) {
    env.storage().instance().set(&InstanceKey::FeeBpm, &bpm);
}

pub fn is_paused(env: &Env) -> bool {
    env.storage()
        .instance()
        .get::<InstanceKey, bool>(&InstanceKey::Paused)
        .unwrap_or(false)
}

pub fn set_paused(env: &Env, paused: bool) {
    env.storage()
        .instance()
        .set(&InstanceKey::Paused, &paused);
}

pub fn get_merchant(env: &Env, merchant: &Address) -> Option<MerchantData> {
    let key = PersistentKey::Merchant(merchant.clone());
    let data = env
        .storage()
        .persistent()
        .get::<PersistentKey, MerchantData>(&key);

    if data.is_some() {
        env.storage()
            .persistent()
            .extend_ttl(&key, PERSISTENT_TTL_LEDGERS / 2, PERSISTENT_TTL_LEDGERS);
    }
    data
}

pub fn set_merchant(env: &Env, merchant: &Address, data: &MerchantData) {
    let key = PersistentKey::Merchant(merchant.clone());
    env.storage().persistent().set(&key, data);
    env.storage()
        .persistent()
        .extend_ttl(&key, PERSISTENT_TTL_LEDGERS / 2, PERSISTENT_TTL_LEDGERS);
}

pub fn get_payment_request(env: &Env, id: &BytesN<32>) -> Option<PaymentRequest> {
    let key = PersistentKey::PaymentRequest(id.clone());
    let data = env
        .storage()
        .persistent()
        .get::<PersistentKey, PaymentRequest>(&key);

    if data.is_some() {
        env.storage()
            .persistent()
            .extend_ttl(&key, PERSISTENT_TTL_LEDGERS / 2, PERSISTENT_TTL_LEDGERS);
    }
    data
}

pub fn set_payment_request(env: &Env, id: &BytesN<32>, data: &PaymentRequest) {
    let key = PersistentKey::PaymentRequest(id.clone());
    env.storage().persistent().set(&key, data);
    env.storage()
        .persistent()
        .extend_ttl(&key, PERSISTENT_TTL_LEDGERS / 2, PERSISTENT_TTL_LEDGERS);
}

pub fn get_merchant_nonce(env: &Env, merchant: &Address) -> u64 {
    let key = PersistentKey::MerchantNonce(merchant.clone());
    env.storage()
        .persistent()
        .get::<PersistentKey, u64>(&key)
        .unwrap_or(0)
}

pub fn increment_merchant_nonce(env: &Env, merchant: &Address) -> u64 {
    let key = PersistentKey::MerchantNonce(merchant.clone());
    let nonce = get_merchant_nonce(env, merchant) + 1;
    env.storage().persistent().set(&key, &nonce);
    env.storage()
        .persistent()
        .extend_ttl(&key, PERSISTENT_TTL_LEDGERS / 2, PERSISTENT_TTL_LEDGERS);
    nonce
}

pub fn is_payment_used(env: &Env, id: &BytesN<32>) -> bool {
    env.storage()
        .temporary()
        .get::<TempKey, bool>(&TempKey::UsedPayment(id.clone()))
        .unwrap_or(false)
}

pub fn mark_payment_used(env: &Env, id: &BytesN<32>) {
    let key = TempKey::UsedPayment(id.clone());
    env.storage().temporary().set(&key, &true);
    env.storage()
        .temporary()
        .extend_ttl(&key, TEMP_TTL_LEDGERS / 2, TEMP_TTL_LEDGERS);
}
