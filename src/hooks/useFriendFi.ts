import { useEthereum, useAuthCore } from "@particle-network/auth-core-modal";
import { useCallback, useMemo, useState, useEffect } from "react";
import { formatEther, ethers } from "ethers";
import { friendKeyManagerContract } from "@/contracts/friendKeyManagerContract";
import { MulticallWrapper } from "ethers-multicall-provider";

type MintListener = (
  level: number,
  operator: string,
  from: string,
  to: string,
  ids: bigint[],
  values: bigint[],
  txHash: string
) => void;

export const useFriendFi = () => {
  const { address, chainInfo, provider, sendTransaction } = useEthereum();
  const { userInfo } = useAuthCore();

  const [registered, setRegistered] = useState(false);
  const [nftId, setNFTId] = useState(0);
  const [nftPrice, setNftPrice] = useState(0);
  const [numUsers, setNumUsers] = useState(0);

  const [isFetching, setIsFetching] = useState(true);

  const [mintListeners, setMintListeners] = useState<
    Record<number, MintListener>
  >({});

  const uuid = userInfo ? userInfo.uuid : "";
  const token = userInfo ? userInfo.token : "";
  const chainId = chainInfo.id;

  const etherProvider = useMemo(() => {
    const provider = new ethers.JsonRpcProvider(chainInfo.rpcUrl);
    return provider;
  }, [chainInfo]);

  const fetching = useCallback(async () => {
    setIsFetching(true);
    console.log(uuid && chainId && provider && address);
    if (uuid && chainId && provider && address) {
      try {
        const multiCallprovider = MulticallWrapper.wrap(etherProvider);
        const contract = friendKeyManagerContract.getContract(
          chainId,
          multiCallprovider
        );

        // TODO: Fetch nft id
        const [isRegisted, price, numUsers] = await Promise.all([
          contract.isRegistered(uuid),
          contract.addressPrice(address),
          contract.numUsers(),
        ]);

        // TODO: Set nft id
        setRegistered(isRegisted);
        setNftPrice(+formatEther(price));
        setNumUsers(+numUsers.toString());
        setIsFetching(false);
      } catch (e) {
        console.error("useFriendFi:useEffect()", e);
        setIsFetching(false);
      }
    }
  }, [address, chainId, etherProvider, provider, uuid]);

  // Data fetching
  useEffect(() => {
    (async () => fetching())();
  }, [userInfo, chainId, provider, address, uuid, etherProvider, fetching]);

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
    const address = friendKeyManagerContract.getAddress(chainId);
    const contract = friendKeyManagerContract.getContract(chainId);
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
      const address = friendKeyManagerContract.getAddress(chainId);
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
        to: address,
        data,
        value: fee.toString(),
      });
    },
    [chainId, etherProvider, sendTransaction]
  );

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
    registered,
    nftId,
    nftPrice,
    numUsers,
    register,
    batchMint,
    addMintListener,
    removeMintListener,
    fetching,
    isFetching,
  };
};
