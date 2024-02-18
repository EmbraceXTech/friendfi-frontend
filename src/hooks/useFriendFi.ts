import { useEthereum, useAuthCore } from "@particle-network/auth-core-modal";
import { useCallback, useMemo, useState, useEffect } from "react";
import { formatEther, ethers } from "ethers";
import { friendKeyManagerContract } from "@/contracts/friendKeyManagerContract";
import { MulticallWrapper } from "ethers-multicall-provider";
import { friendKeyContract } from "@/contracts/friendKeyContract";
import { userManagerContract } from "@/contracts/userManagerContract";
import { covalent } from "@/services/covalent";
import { ChainID } from "@covalenthq/client-sdk";

type MintListener = (
  level: number,
  operator: string,
  from: string,
  to: string,
  ids: bigint[],
  values: bigint[],
  txHash: string
) => void;

type FriendKey = {
  contractAddress: string;
  level: number;
  balance: number;
  tokenId: number;
  tokenUri: string;
  name: string;
  description: string;
  asset_url: string;
}

export const useFriendFi = () => {
  const { address, chainInfo, provider, sendTransaction } = useEthereum();
  const { userInfo } = useAuthCore();

  const [fetching, setFetching] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [nftId, setNFTId] = useState(0);
  const [numUsers, setNumUsers] = useState(0);
  const [friendKeys, setFriendKeys] = useState<FriendKey[]>([]);

  const [mintListeners, setMintListeners] = useState<
    Record<number, MintListener>
  >({});

  const uuid = userInfo ? userInfo.uuid : "";
  const token = userInfo ? userInfo.token : "";
  const chainId = chainInfo.id;

  const etherProvider = useMemo(
    () => new ethers.JsonRpcProvider(chainInfo.rpcUrl),
    [chainInfo]
  );

  const fetchData = useCallback(async () => {
    if (uuid && chainId && provider && address) {
      try {
        const multiCallprovider = MulticallWrapper.wrap(etherProvider);
        const contract = userManagerContract.getContract(
          chainId,
          multiCallprovider
        );

        const [isRegisted, nftId, numUsers] = await Promise.all([
          contract.isRegistered(uuid),
          contract.addressId(address),
          contract.numUsers(),
        ]);

        setRegistered(isRegisted);
        setNFTId(+nftId.toString());
        setNumUsers(+numUsers.toString());
      } catch (e) {
        console.error("useFriendFi:useEffect()", e);
      }
    }
  }, [uuid, chainId, provider, address, etherProvider]);

  // Data fetching
  useEffect(() => {
    (async () => {
      setFetching(true);
      await fetchData();
      setFetching(false);
    })();
  }, [userInfo, chainId, provider, address, fetchData]);

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
    const data = contract.interface.encodeFunctionData("register", [
      uuid,
      token,
    ]);
    return sendTransaction({
      to: address,
      data,
    });
  }, [chainId, uuid, token, sendTransaction]);

  const batchMint = useCallback(
    async (amount: number) => {
      if (!address) {
        throw new Error("Invalid address");
      }
      const contractAddress = friendKeyManagerContract.getAddress(chainId);
      const contract = friendKeyManagerContract.getContract(
        chainId,
        etherProvider
      );
      const fee = await contract.getMintFee(amount);
      const data = contract.interface.encodeFunctionData("batchMint", [
        address,
        amount,
      ]);
      return sendTransaction({
        to: contractAddress,
        data,
        value: fee.toString(),
      });
    },
    [address, chainId, etherProvider, sendTransaction]
  );

  const fetchFriendKeys = useCallback(async () => {
    if (address && chainId) {
      const resp = await covalent.NftService.getNftsForAddress(chainId as ChainID, address, { "withUncached": true });
      const contractAddress0 = friendKeyContract.getAddress(chainId, 0);
      const contractAddress1 = friendKeyContract.getAddress(chainId, 1);
      const contractAddress2 = friendKeyContract.getAddress(chainId, 2);
      const formattedData: FriendKey[] = resp.data.items.reduce((prev, item) => {
        let level = -1;
        if (item.contract_address.toLowerCase() === contractAddress0.toLowerCase()) level = 0;
        else if (item.contract_address.toLowerCase() === contractAddress1.toLowerCase()) level = 1;
        else if (item.contract_address.toLowerCase() === contractAddress2.toLowerCase()) level = 2;
        if (level >= 0) {
          const data = {
            contractAddress: item.contract_address,
            level,
            balance: +(item.balance || BigInt(0)).toString(),
            tokenId: +(item.nft_data[0].token_id || BigInt(0)).toString(),
            tokenUri: item.nft_data[0].token_url,
            name: item.nft_data[0].external_data.name,
            description: item.nft_data[0].external_data.description,
            asset_url: item.nft_data[0].external_data.asset_url
          }
          return [...prev, data];
        } else {
          return prev;
        }
      }, [] as FriendKey[]);
      setFriendKeys(formattedData);
    }
  }, [address, chainId]);

  const addMintListener = useCallback(
    (fn: MintListener) => {
      const id = Math.floor(Math.random() * 1000);
      mintListeners[id] = fn;
      setMintListeners({ ...mintListeners });
      return id;
    },
    [mintListeners]
  );

  const removeMintListener = useCallback(
    (id: number) => {
      delete mintListeners[id];
      setMintListeners({ ...mintListeners });
    },
    [mintListeners]
  );

  return {
    fetching,
    registered,
    nftId,
    numUsers,
    friendKeys,
    fetchData,
    fetchFriendKeys,
    register,
    batchMint,
    addMintListener,
    removeMintListener,
  };
};
