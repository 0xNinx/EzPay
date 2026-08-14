#[cfg(test)]
mod tests {
    use soroban_sdk::{Address, BytesN, Env};

    use crate::{
        admin::{initialize, set_admin, set_fee, pause, unpause, get_admin, get_fee_config},
        testutils::create_test_env,
        ContractError,
    };

    #[test]
    fn test_initialize_success() {
        let env = create_test_env();
        
        let admin = Address::generate(&env);
        let fee_recipient = Address::generate(&env);
        let fee_bpm = 100;

        let result = initialize(&env, admin.clone(), fee_recipient, fee_bpm);
        assert!(result.is_ok());

        let retrieved_admin = get_admin(&env).unwrap();
        assert_eq!(retrieved_admin, admin);

        let (recipient, bpm) = get_fee_config(&env).unwrap();
        assert_eq!(recipient, fee_recipient);
        assert_eq!(bpm, fee_bpm);
    }

    #[test]
    fn test_initialize_twice_fails() {
        let env = create_test_env();
        
        let admin = Address::generate(&env);
        let fee_recipient = Address::generate(&env);
        let fee_bpm = 100;

        initialize(&env, admin.clone(), fee_recipient, fee_bpm).unwrap();
        
        let result = initialize(&env, admin, fee_recipient, fee_bpm);
        assert!(matches!(result, Err(ContractError::AlreadyInitialized)));
    }

    #[test]
    fn test_set_admin_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let new_admin = Address::generate(&env);
        let result = set_admin(&env, new_admin.clone());
        assert!(result.is_ok());

        let retrieved_admin = get_admin(&env).unwrap();
        assert_eq!(retrieved_admin, new_admin);
    }

    #[test]
    fn test_set_admin_not_authorized() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let unauthorized = Address::generate(&env);
        let result = set_admin(&env, unauthorized);
        assert!(matches!(result, Err(ContractError::NotAuthorized)));
    }

    #[test]
    fn test_set_fee_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let new_fee_recipient = Address::generate(&env);
        let new_fee_bpm = 200;
        let result = set_fee(&env, new_fee_recipient.clone(), new_fee_bpm);
        assert!(result.is_ok());

        let (recipient, bpm) = get_fee_config(&env).unwrap();
        assert_eq!(recipient, new_fee_recipient);
        assert_eq!(bpm, new_fee_bpm);
    }

    #[test]
    fn test_set_fee_invalid_bpm() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let fee_recipient = Address::generate(&env);
        let result = set_fee(&env, fee_recipient, 10001); // > 100%
        assert!(matches!(result, Err(ContractError::InvalidFee)));
    }

    #[test]
    fn test_pause_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let result = pause(&env);
        assert!(result.is_ok());
    }

    #[test]
    fn test_unpause_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        pause(&env).unwrap();
        let result = unpause(&env);
        assert!(result.is_ok());
    }

    #[test]
    fn test_get_admin_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let retrieved_admin = get_admin(&env).unwrap();
        assert_eq!(retrieved_admin, admin);
    }

    #[test]
    fn test_get_admin_not_initialized() {
        let env = create_test_env();
        
        let result = get_admin(&env);
        assert!(matches!(result, Err(ContractError::NotInitialized)));
    }

    #[test]
    fn test_get_fee_config_success() {
        let env = create_test_env();
        let admin = register_test_admin(&env);
        
        let (recipient, bpm) = get_fee_config(&env).unwrap();
        assert_eq!(bpm, 100); // Default from register_test_admin
    }

    #[test]
    fn test_get_fee_config_not_initialized() {
        let env = create_test_env();
        
        let result = get_fee_config(&env);
        assert!(matches!(result, Err(ContractError::NotInitialized)));
    }
}
