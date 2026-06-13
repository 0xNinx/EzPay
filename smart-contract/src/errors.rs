use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ContractError {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    Unauthorized = 100,
    NotMerchantOwner = 101,
    ContractPaused = 200,
    MerchantAlreadyExists = 300,
    MerchantNotFound = 301,
    MerchantDeactivated = 302,
    PaymentRequestNotFound = 400,
    PaymentRequestNotPending = 401,
    AmountMismatch = 402,
    TokenMismatch = 403,
    FeeTooHigh = 500,
    ArithmeticOverflow = 501,
}
