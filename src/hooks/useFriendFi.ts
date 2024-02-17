import { useEthereum, useAuthCore } from "@particle-network/auth-core-modal";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { JsonRpcProvider, formatEther } from "ethers";
import { friendKeyManagerContract } from "@/contracts/friendKeyManagerContract";
import { MulticallWrapper } from "ethers-multicall-provider";
import { friendKeyContract } from "@/contracts/friendKeyContract";
import { userManagerContract } from "@/contracts/userManagerContract";

type MintListener = (level: number, operator: string, from: string, to: string, ids: bigint[], values: bigint[], txHash: string) => void;

export function useFriendFi() {
    const { address, chainInfo, provider, sendTransaction } = useEthereum();
    const { userInfo } = useAuthCore();

    const [registered, setRegistered] = useState(false);
    const [nftId, setNFTId] = useState(0);
    const [numUsers, setNumUsers] = useState(0);

    const [mintListeners, setMintListeners] = useState<Record<number, MintListener>>({});

    const uuid = userInfo ? userInfo.uuid : "";
    const token = userInfo ? userInfo.token : "";
    const chainId = chainInfo.id;

    const etherProvider = new JsonRpcProvider(chainInfo.rpcUrl);

    // Data fetching
    useEffect(() => {
        (async () => {
            if (uuid && chainId && provider && address) {
                try {
                    const multiCallprovider = MulticallWrapper.wrap(etherProvider);
                    const contract = userManagerContract.getContract(chainId, multiCallprovider);

                    const [isRegisted, nftId, numUsers] = await Promise.all([
                        contract.isRegistered(uuid),
                        contract.addressId(address),
                        contract.numUsers()
                    ]);

                    setRegistered(isRegisted);
                    setNFTId(+nftId.toString());
                    setNumUsers(+numUsers.toString());
                } catch (e) {
                    console.error("useFriendFi:useEffect()", e);
                }
            }
        })()
        setRegistered(false);
    }, [userInfo, chainId, provider, address]);

    // Event listeners
    useEffect(() => {
        // const listeners = [0, 1, 2].map(level => (
        //     (operator: string, from: string, to: string, ids: bigint[], values: bigint[], event: any) => {
        //         Object.values(mintListeners).forEach(fn => fn(level, operator, from, to, ids, values, event.transactionHash))
        //     }
        // ))
        // for (let level = 0; level < 3; level++) {
        //     const contract = friendKeyContract.getContract(chainId, level, etherProvider);
        //     const event = contract.getEvent("TransferBatch")
        //     contract.on(event, listeners[level]);
        // }

        // return () => {
        //     for (let level = 0; level < 3; level++) {
        //         const contract = friendKeyContract.getContract(chainId, level, etherProvider);
        //         const event = contract.getEvent("TransferBatch")
        //         contract.off(event, listeners[level]);
        //     }
        // }
    }, [mintListeners, chainId, etherProvider]);

    const register = useCallback(() => {
        const address = userManagerContract.getAddress(chainId);
        const contract = userManagerContract.getContract(chainId);
        const data = contract.interface.encodeFunctionData('register', [uuid, token]);
        return sendTransaction({
            to: address,
            data
        })
    }, [chainId, uuid, token]);

    const batchMint = useCallback(async (amount: number) => {
        const address = friendKeyManagerContract.getAddress(chainId);
        const contract = friendKeyManagerContract.getContract(chainId, etherProvider);
        const fee = await contract.getMintFee(amount);
        const data = contract.interface.encodeFunctionData("batchMint", [address, amount]);
        return sendTransaction({
            to: address,
            data,
            value: fee.toString()
        })
    }, [chainId, address, etherProvider]);

    const addMintListener = useCallback((fn: MintListener) => {
        const id = Math.floor(Math.random() * 1000);
        mintListeners[id] = fn;
        setMintListeners({ ...mintListeners });
        return id;
    }, []);

    const removeMintListener = useCallback((id: number) => {
        delete mintListeners[id];
        setMintListeners({ ...mintListeners });
    }, [mintListeners]);

    return {
        registered,
        nftId,
        numUsers,
        register,
        batchMint,
        addMintListener,
        removeMintListener
    }
}