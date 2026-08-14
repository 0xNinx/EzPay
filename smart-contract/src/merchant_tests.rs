#[cfg(test)]
mod tests {
    use soroban_sdk::{Address, Env, String};

    use crate::{
        merchant::{register_merchant, update_merchant, deactivate_merchant, get_merchant, is_merchant_active},
        testutils::{create_test_env, register_test_admin},
        types::{MerchantData, PayoutMethod},
        ContractError,
    };

    #[test]
    fn test_register_merchant_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        let payout = PayoutMethod::Wallet;

        let result = register_merchant(&env, merchant.clone(), name, wallet, payout);
        assert!(result.is_ok());

        let merchant_data = get_merchant(&env, &merchant).unwrap();
        assert_eq!(merchant_data.name, String::from_str(&env, "Test Merchant"));
        assert!(merchant_data.is_active);
    }

    #[test]
    fn test_register_merchant_already_exists() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        let payout = PayoutMethod::Wallet;

        register_merchant(&env, merchant.clone(), name.clone(), wallet.clone(), payout).unwrap();
        
        let result = register_merchant(&env, merchant, name, wallet, payout);
        assert!(matches!(result, Err(ContractError::MerchantAlreadyRegistered)));
    }

    #[test]
    fn test_update_merchant_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        let payout = PayoutMethod::Wallet;

        register_merchant(&env, merchant.clone(), name.clone(), wallet.clone(), payout).unwrap();
        
        let new_name = String::from_str(&env, "Updated Merchant");
        let new_wallet = Address::generate(&env);
        let new_payout = PayoutMethod::Bank;

        let result = update_merchant(&env, merchant.clone(), new_name, new_wallet, new_payout);
        assert!(result.is_ok());

        let merchant_data = get_merchant(&env, &merchant).unwrap();
        assert_eq!(merchant_data.name, String::from_str(&env, "Updated Merchant"));
    }

    #[test]
    fn test_update_merchant_not_found() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        let payout = PayoutMethod::Bank;

        let result = update_merchant(&env, merchant, name, wallet, payout);
        assert!(matches!(result, Err(ContractError::MerchantNotFound)));
    }

    #[test]
    fn test_deactivate_merchant_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        let payout = PayoutMethod::Wallet;

        register_merchant(&env, merchant.clone(), name, wallet, payout).unwrap();
        assert!(is_merchant_active(&env, &merchant));

        deactivate_merchant(&env, merchant.clone()).unwrap();
        assert!(!is_merchant_active(&env, &merchant));
    }

    #[test]
    fn test_deactivate_merchant_not_found() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);

        let result = deactivate_merchant(&env, merchant);
        assert!(matches!(result, Err(ContractError::MerchantNotFound)));
    }

    #[test]
    fn test_get_merchant_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        let payout = PayoutMethod::Wallet;

        register_merchant(&env, merchant.clone(), name.clone(), wallet.clone(), payout).unwrap();
        
        let merchant_data = get_merchant(&env, &merchant).unwrap();
        assert_eq!(merchant_data.name, name);
        assert_eq!(merchant_data.wallet_address, wallet);
        assert!(merchant_data.is_active);
    }

    #[test]
    fn test_get_merchant_not_found() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);

        let result = get_merchant(&env, &merchant);
        assert!(matches!(result, Err(ContractError::MerchantNotFound)));
    }

    #[test]
    fn test_is_merchant_active_true() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        let name = String::from_str(&env, "Test Merchant");
        let wallet = Address::generate(&env);
        let payout = PayoutMethod::Wallet;

        register_merchant(&env, merchant.clone(), name, wallet, payout).unwrap();
        
        assert!(is_merchant_active(&env, &merchant));
    }

    #[test]
    fn test_is_merchant_active_false() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let merchant = Address::generate(&env);
        
        assert!(!is_merchant_active(&env, &merchant));
    }
}
