use soroban_sdk::{contracttype, Address, BytesN, String};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum InstanceKey {
    Admin,
    Paused,
    FeeRecipient,
    FeeBpm,
    Initialized,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum PersistentKey {
    Merchant(Address),
    PaymentRequest(BytesN<32>),
    MerchantNonce(Address),
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum TempKey {
    UsedPayment(BytesN<32>),
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum PayoutMethod {
    Wallet,
    BankAccount,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum PaymentStatus {
    Pending,
    Completed,
    Cancelled,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct MerchantData {
    pub address: Address,
    pub name: String,
    pub wallet_address: Address,
    pub payout_method: PayoutMethod,
    pub is_active: bool,
    pub registered_at_ledger: u32,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct PaymentRequest {
    pub id: BytesN<32>,
    pub merchant: Address,
    pub token: Address,
    pub amount: i128,
    pub memo: String,
    pub status: PaymentStatus,
    pub created_at_ledger: u32,
    pub settled_at_ledger: u32,
    pub paid_by: Option<Address>,
    pub net_amount: i128,
    pub fee_amount: i128,
}
