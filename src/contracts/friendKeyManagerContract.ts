import { ethers } from "ethers";
import { FriendKeyManager__factory } from "./typechain/factories/FriendKeyManager__factory";
import { CHAIN_IDS, CONTRACT_ADDRESSES } from "./addresses";
import { ChainId } from "@particle-network/chains";

function getAddress(chainId: number) {
    if (!CHAIN_IDS.includes(chainId)) {
        throw new Error(`${chainId} is not available chain. Available: ${CHAIN_IDS.join(', ')}`)
    }
    return CONTRACT_ADDRESSES[chainId as ChainId]['FriendKeyManager'];
}

function getContract(chainId: number, provider?: ethers.Provider | ethers.Signer) {
    const contractAddress = getAddress(chainId);
    return FriendKeyManager__factory.connect(contractAddress, provider);
}

function isRegistered(uuid: string, chainId: number, provider?: ethers.Provider | ethers.Signer) {
    const contract = getContract(chainId, provider);
    return contract.isRegistered(uuid);
}

function addressUUIDs(addr: string, chainId: number, provider?: ethers.Provider | ethers.Signer) {
    const contract = getContract(chainId, provider);
    return contract.addressUUIDs(addr);
}

function uuidAddresses(uuid: string, chainId: number, provider?: ethers.Provider | ethers.Signer) {
    const contract = getContract(chainId, provider);
    return contract.uuidAddresses(uuid);
}

function addressPrice(addr: string, chainId: number, provider?: ethers.Provider | ethers.Signer) {
    const contract = getContract(chainId, provider);
    return contract.addressPrice(addr);
}

function uuidPrice(uuid: string, chainId: number, provider?: ethers.Provider | ethers.Signer) {
    const contract = getContract(chainId, provider);
    return contract.uuidPrice(uuid);
}

function addresses(index: number, chainId: number, provider?: ethers.Provider | ethers.Signer) {
    const contract = getContract(chainId, provider);
    return contract.addresses(index);
}

function uuids(index: number, chainId: number, provider?: ethers.Provider | ethers.Signer) {
    const contract = getContract(chainId, provider);
    return contract.uuids(index);
}

function prices(index: number, chainId: number, provider?: ethers.Provider | ethers.Signer) {
    const contract = getContract(chainId, provider);
    return contract.prices(index);
}

function numUsers(chainId: number, provider?: ethers.Provider | ethers.Signer) {
    const contract = getContract(chainId, provider);
    return contract.numUsers();
}

export const friendKeyManagerContract = {
    getAddress,
    getContract,
    isRegistered,
    addressUUIDs,
    uuidAddresses,
    addressPrice,
    uuids,
    prices,
    uuidPrice,
    addresses,
    numUsers
}