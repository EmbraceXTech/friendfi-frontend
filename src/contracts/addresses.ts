const FUJI_ADDRESSES = {
    "UserManager": "0x36BdBF70B474D6A2aF3F17531Cfe1a9Ea1036c03",
    "FriendKeyManager": "0x959AF465b9C8d34BD37c9e61b8d457daAEEac241",
    "FriendKey0": "0x808bbdF7CB4e4Cd2DA518515B13a8bc642367ed7",
    "FriendKey1": "0xe4806d9ecD28c2e54F7c913698267Ea8F828765A",
    "FriendKey2": "0x73af150C6dDc8f27E2Af0cc55fcAC32f7A72Dc53",
}


export const CONTRACT_ADDRESSES = {
    43113: FUJI_ADDRESSES
} as Record<number, Record<string, string>>

export type ChainId = 43113;
export const CHAIN_IDS = Object.keys(CONTRACT_ADDRESSES).map(id => +id);