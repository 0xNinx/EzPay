use soroban_sdk::{Address, BytesN, Env};

use crate::{errors::ContractError, events, storage};

pub fn require_admin(env: &Env) -> Result<(), ContractError> {
    let admin = storage::get_admin(env).ok_or(ContractError::NotInitialized)?;
    admin.require_auth();
    Ok(())
}

pub fn require_not_paused(env: &Env) -> Result<(), ContractError> {
    if storage::is_paused(env) {
        return Err(ContractError::ContractPaused);
    }
    Ok(())
}

pub fn initialize(
    env: &Env,
    admin: Address,
    fee_recipient: Address,
    fee_bpm: u32,
) -> Result<(), ContractError> {
    if storage::is_initialized(env) {
        return Err(ContractError::AlreadyInitialized);
    }
    if fee_bpm > 10_000 {
        return Err(ContractError::FeeTooHigh);
    }

    storage::set_admin(env, &admin);
    storage::set_fee_recipient(env, &fee_recipient);
    storage::set_fee_bpm(env, fee_bpm);
    storage::set_paused(env, false);
    storage::set_initialized(env);

    events::emit_admin_changed(env, &admin);
    events::emit_fee_updated(env, &fee_recipient, fee_bpm);

    Ok(())
}

pub fn set_admin(env: &Env, new_admin: Address) -> Result<(), ContractError> {
    require_admin(env)?;
    storage::set_admin(env, &new_admin);
    events::emit_admin_changed(env, &new_admin);
    Ok(())
}

pub fn set_fee(env: &Env, fee_recipient: Address, fee_bpm: u32) -> Result<(), ContractError> {
    require_admin(env)?;
    if fee_bpm > 10_000 {
        return Err(ContractError::FeeTooHigh);
    }
    storage::set_fee_recipient(env, &fee_recipient);
    storage::set_fee_bpm(env, fee_bpm);
    events::emit_fee_updated(env, &fee_recipient, fee_bpm);
    Ok(())
}

pub fn pause(env: &Env) -> Result<(), ContractError> {
    require_admin(env)?;
    storage::set_paused(env, true);
    events::emit_paused(env);
    Ok(())
}

pub fn unpause(env: &Env) -> Result<(), ContractError> {
    require_admin(env)?;
    storage::set_paused(env, false);
    events::emit_unpaused(env);
    Ok(())
}

pub fn upgrade(env: &Env, new_wasm_hash: BytesN<32>) -> Result<(), ContractError> {
    require_admin(env)?;
    events::emit_upgraded(env, &new_wasm_hash);
    env.deployer().update_current_contract_wasm(new_wasm_hash);
    Ok(())
}

pub fn get_fee_config(env: &Env) -> Result<(Address, u32), ContractError> {
    let recipient = storage::get_fee_recipient(env).ok_or(ContractError::NotInitialized)?;
    let bpm = storage::get_fee_bpm(env);
    Ok((recipient, bpm))
}

pub fn get_admin(env: &Env) -> Result<Address, ContractError> {
    storage::get_admin(env).ok_or(ContractError::NotInitialized)
}
