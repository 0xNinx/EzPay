use soroban_sdk::{token, Address, BytesN, Env, String};

use crate::{
    admin::require_not_paused,
    errors::ContractError,
    events,
    storage,
    types::{PaymentRequest, PaymentStatus},
};

fn derive_request_id(env: &Env, merchant: &Address, nonce: u64) -> BytesN<32> {
    use soroban_sdk::Bytes;

    let mut preimage = Bytes::new(env);
    let merchant_bytes = merchant.to_xdr(env);
    preimage.append(&merchant_bytes);

    for b in nonce.to_le_bytes() {
        preimage.push_back(b);
    }
    for b in env.ledger().sequence().to_le_bytes() {
        preimage.push_back(b);
    }

    env.crypto().sha256(&preimage)
}

pub fn create_payment_request(
    env: &Env,
    merchant: Address,
    token: Address,
    amount: i128,
    memo: String,
) -> Result<BytesN<32>, ContractError> {
    require_not_paused(env)?;
    merchant.require_auth();

    let merchant_data = storage::get_merchant(env, &merchant)
        .ok_or(ContractError::MerchantNotFound)?;
    if !merchant_data.is_active {
        return Err(ContractError::MerchantDeactivated);
    }

    let nonce = storage::increment_merchant_nonce(env, &merchant);
    let id = derive_request_id(env, &merchant, nonce);

    let request = PaymentRequest {
        id: id.clone(),
        merchant: merchant.clone(),
        token,
        amount,
        memo,
        status: PaymentStatus::Pending,
        created_at_ledger: env.ledger().sequence(),
        settled_at_ledger: 0,
        paid_by: None,
        net_amount: 0,
        fee_amount: 0,
    };

    storage::set_payment_request(env, &id, &request);
    events::emit_payment_request_created(env, &id, &request);

    Ok(id)
}

pub fn pay(
    env: &Env,
    payer: Address,
    request_id: BytesN<32>,
    token: Address,
    amount: i128,
) -> Result<(), ContractError> {
    require_not_paused(env)?;
    payer.require_auth();

    let mut request = storage::get_payment_request(env, &request_id)
        .ok_or(ContractError::PaymentRequestNotFound)?;

    if request.status != PaymentStatus::Pending {
        return Err(ContractError::PaymentRequestNotPending);
    }
    if request.token != token {
        return Err(ContractError::TokenMismatch);
    }
    if request.amount != amount {
        return Err(ContractError::AmountMismatch);
    }

    let fee_bpm = storage::get_fee_bpm(env) as i128;
    let fee_amount = amount
        .checked_mul(fee_bpm)
        .ok_or(ContractError::ArithmeticOverflow)?
        .checked_div(10_000)
        .ok_or(ContractError::ArithmeticOverflow)?;
    let net_amount = amount
        .checked_sub(fee_amount)
        .ok_or(ContractError::ArithmeticOverflow)?;

    let token_client = token::Client::new(env, &token);
    let contract_address = env.current_contract_address();

    token_client.transfer(&payer, &contract_address, &amount);

    let merchant_data = storage::get_merchant(env, &request.merchant)
        .ok_or(ContractError::MerchantNotFound)?;

    token_client.transfer(&contract_address, &merchant_data.wallet_address, &net_amount);

    if fee_amount > 0 {
        let fee_recipient = storage::get_fee_recipient(env)
            .ok_or(ContractError::NotInitialized)?;
        token_client.transfer(&contract_address, &fee_recipient, &fee_amount);
    }

    request.status = PaymentStatus::Completed;
    request.settled_at_ledger = env.ledger().sequence();
    request.paid_by = Some(payer.clone());
    request.net_amount = net_amount;
    request.fee_amount = fee_amount;

    storage::set_payment_request(env, &request_id, &request);
    storage::mark_payment_used(env, &request_id);

    events::emit_payment_completed(env, &request_id, &payer, &token, net_amount, fee_amount);

    Ok(())
}

pub fn cancel_payment_request(
    env: &Env,
    merchant: Address,
    request_id: BytesN<32>,
) -> Result<(), ContractError> {
    require_not_paused(env)?;
    merchant.require_auth();

    let mut request = storage::get_payment_request(env, &request_id)
        .ok_or(ContractError::PaymentRequestNotFound)?;

    if request.merchant != merchant {
        return Err(ContractError::NotMerchantOwner);
    }
    if request.status != PaymentStatus::Pending {
        return Err(ContractError::PaymentRequestNotPending);
    }

    request.status = PaymentStatus::Cancelled;
    request.settled_at_ledger = env.ledger().sequence();

    storage::set_payment_request(env, &request_id, &request);
    events::emit_payment_request_cancelled(env, &request_id, &merchant);

    Ok(())
}

pub fn get_payment_request(
    env: &Env,
    request_id: &BytesN<32>,
) -> Result<PaymentRequest, ContractError> {
    storage::get_payment_request(env, request_id)
        .ok_or(ContractError::PaymentRequestNotFound)
}
