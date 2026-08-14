#[cfg(test)]
mod tests {
    use soroban_sdk::{Address, BytesN, Env, String};

    use crate::{
        payment::{create_payment_request, pay, cancel_payment_request, get_payment_request},
        merchant::register_merchant,
        testutils::{create_test_env, register_test_admin},
        types::{PaymentStatus, PayoutMethod},
        ContractError,
    };

    #[test]
    fn test_create_payment_request_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        register_merchant(&env, merchant.clone(), name, wallet, PayoutMethod::Wallet).unwrap();

        let token = Address::generate(&env);
        let amount = 1000;
        let memo = String::from_str(&env, "Payment for services");

        let result = create_payment_request(&env, merchant.clone(), token, amount, memo.clone());
        assert!(result.is_ok());

        let request_id = result.unwrap();
        let payment_request = get_payment_request(&env, &request_id).unwrap();
        assert_eq!(payment_request.merchant, merchant);
        assert_eq!(payment_request.amount, amount);
        assert_eq!(payment_request.memo, memo);
        assert_eq!(payment_request.status, PaymentStatus::Pending);
    }

    #[test]
    fn test_create_payment_request_merchant_not_active() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let token = Address::generate(&env);
        let amount = 1000;
        let memo = String::from_str(&env, "Payment");

        let result = create_payment_request(&env, merchant, token, amount, memo);
        assert!(matches!(result, Err(ContractError::MerchantNotActive)));
    }

    #[test]
    fn test_pay_payment_request_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        register_merchant(&env, merchant.clone(), name, wallet, PayoutMethod::Wallet).unwrap();

        let token = Address::generate(&env);
        let amount = 1000;
        let memo = String::from_str(&env, "Payment");

        let request_id = create_payment_request(&env, merchant.clone(), token, amount, memo).unwrap();
        
        let payer = Address::generate(&env);
        let result = pay(&env, payer, request_id, token, amount);
        assert!(result.is_ok());

        let payment_request = get_payment_request(&env, &request_id).unwrap();
        assert_eq!(payment_request.status, PaymentStatus::Paid);
    }

    #[test]
    fn test_pay_payment_request_wrong_amount() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        register_merchant(&env, merchant.clone(), name, wallet, PayoutMethod::Wallet).unwrap();

        let token = Address::generate(&env);
        let amount = 1000;
        let memo = String::from_str(&env, "Payment");

        let request_id = create_payment_request(&env, merchant.clone(), token, amount, memo).unwrap();
        
        let payer = Address::generate(&env);
        let result = pay(&env, payer, request_id, token, 500); // Wrong amount
        assert!(matches!(result, Err(ContractError::InvalidAmount)));
    }

    #[test]
    fn test_cancel_payment_request_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        register_merchant(&env, merchant.clone(), name, wallet, PayoutMethod::Wallet).unwrap();

        let token = Address::generate(&env);
        let amount = 1000;
        let memo = String::from_str(&env, "Payment");

        let request_id = create_payment_request(&env, merchant.clone(), token, amount, memo).unwrap();
        
        let result = cancel_payment_request(&env, merchant, request_id);
        assert!(result.is_ok());

        let payment_request = get_payment_request(&env, &request_id).unwrap();
        assert_eq!(payment_request.status, PaymentStatus::Cancelled);
    }

    #[test]
    fn test_cancel_payment_request_not_found() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let request_id = BytesN::from_array(&env, &[0; 32]);

        let result = cancel_payment_request(&env, merchant, request_id);
        assert!(matches!(result, Err(ContractError::PaymentRequestNotFound)));
    }

    #[test]
    fn test_get_payment_request_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        register_merchant(&env, merchant.clone(), name, wallet, PayoutMethod::Wallet).unwrap();

        let token = Address::generate(&env);
        let amount = 1000;
        let memo = String::from_str(&env, "Payment");

        let request_id = create_payment_request(&env, merchant.clone(), token, amount, memo.clone()).unwrap();
        
        let payment_request = get_payment_request(&env, &request_id).unwrap();
        assert_eq!(payment_request.merchant, merchant);
        assert_eq!(payment_request.amount, amount);
        assert_eq!(payment_request.memo, memo);
    }

    #[test]
    fn test_get_payment_request_not_found() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let request_id = BytesN::from_array(&env, &[0; 32]);

        let result = get_payment_request(&env, &request_id);
        assert!(matches!(result, Err(ContractError::PaymentRequestNotFound)));
    }
}
