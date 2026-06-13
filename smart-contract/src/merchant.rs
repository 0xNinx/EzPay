use soroban_sdk::{Address, Env, String};

use crate::{
    admin::require_not_paused,
    errors::ContractError,
    events,
    storage,
    types::{MerchantData, PayoutMethod},
};

pub fn register_merchant(
    env: &Env,
    merchant: Address,
    name: String,
    wallet_address: Address,
    payout_method: PayoutMethod,
) -> Result<(), ContractError> {
    require_not_paused(env)?;
    merchant.require_auth();

    if storage::get_merchant(env, &merchant).is_some() {
        return Err(ContractError::MerchantAlreadyExists);
    }

    let data = MerchantData {
        address: merchant.clone(),
        name,
        wallet_address,
        payout_method,
        is_active: true,
        registered_at_ledger: env.ledger().sequence(),
    };

    storage::set_merchant(env, &merchant, &data);
    events::emit_merchant_registered(env, &merchant, &data);

    Ok(())
}

pub fn update_merchant(
    env: &Env,
    merchant: Address,
    name: String,
    wallet_address: Address,
    payout_method: PayoutMethod,
) -> Result<(), ContractError> {
    require_not_paused(env)?;
    merchant.require_auth();

    let mut data = storage::get_merchant(env, &merchant)
        .ok_or(ContractError::MerchantNotFound)?;

    if !data.is_active {
        return Err(ContractError::MerchantDeactivated);
    }

    data.name = name;
    data.wallet_address = wallet_address;
    data.payout_method = payout_method;

    storage::set_merchant(env, &merchant, &data);
    events::emit_merchant_updated(env, &merchant, &data);

    Ok(())
}

pub fn deactivate_merchant(env: &Env, merchant: Address) -> Result<(), ContractError> {
    require_not_paused(env)?;
    merchant.require_auth();

    let mut data = storage::get_merchant(env, &merchant)
        .ok_or(ContractError::MerchantNotFound)?;

    data.is_active = false;
    storage::set_merchant(env, &merchant, &data);
    events::emit_merchant_deactivated(env, &merchant);

    Ok(())
}

pub fn get_merchant(env: &Env, merchant: &Address) -> Result<MerchantData, ContractError> {
    storage::get_merchant(env, merchant).ok_or(ContractError::MerchantNotFound)
}

pub fn is_merchant_active(env: &Env, merchant: &Address) -> bool {
    storage::get_merchant(env, merchant)
        .map(|m| m.is_active)
        .unwrap_or(false)
}
