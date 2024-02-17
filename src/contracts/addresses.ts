const FUJI_ADDRESSES = {
    "FriendKeyManager": "0x913F0b4Df6b1E76fe672dFB196201A472adC9Bfb",
    "FriendKey0": "0xA4797AB7f20D36F6392a8470D103BC3D95Ca68C3",
    "FriendKey1": "0xf5e9810c1f4363B015bc3535E43eAB0afc188Ac6",
    "FriendKey2": "0x96924334406bDa84ccE428363d78056a918f360c",
}


export const CONTRACT_ADDRESSES = {
    43113: FUJI_ADDRESSES
} as Record<number, Record<string, string>>

export type ChainId = 43113;
export const CHAIN_IDS = Object.keys(CONTRACT_ADDRESSES).map(id => +id);