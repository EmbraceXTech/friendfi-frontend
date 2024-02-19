import { useEthereum, useAuthCore } from "@particle-network/auth-core-modal";
import { useCallback, useMemo, useState, useEffect } from "react";
import { formatEther, ethers, parseEther } from "ethers";
import { friendKeyManagerContract } from "@/contracts/friendKeyManagerContract";
import { MulticallWrapper } from "ethers-multicall-provider";
import { friendKeyContract } from "@/contracts/friendKeyContract";
import { userManagerContract } from "@/contracts/userManagerContract";
import { covalent } from "@/services/covalent";
import { ChainID } from "@covalenthq/client-sdk";
import { backend } from "@/services/backend";

const INTERVAL = 5 * 1000;
const TIMEOUT = 60 * 1000;

type FriendKey = {
  uuid: string;
  tokenId: number;
  tokenUri: string;
  name: string;
  description: string;
  asset_url: string;
  tier: {
    contractAddress: string;
    level: string;
    balance: string;
  }[];
};

type MintedKey = {
  id: number;
  value: number;
};

export const useFriendFi = () => {
  const { address, chainInfo, provider, sendTransaction } = useEthereum();
  const { userInfo } = useAuthCore();

  const [fetching, setFetching] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [nftId, setNFTId] = useState(0);
  const [numUsers, setNumUsers] = useState(0);
  const [friendKeys, setFriendKeys] = useState<FriendKey[]>([]);
  const [mintFee, setMintFee] = useState(0);

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
        const keyManagerContract = friendKeyManagerContract.getContract(
          chainId,
          multiCallprovider
        );

        const [isRegisted, nftId, numUsers, mintFee] = await Promise.all([
          contract.isRegistered(uuid),
          contract.addressId(address),
          contract.numUsers(),
          keyManagerContract.getMintFee(1),
        ]);

        setRegistered(isRegisted);
        setNFTId(+nftId.toString());
        setNumUsers(+numUsers.toString());
        setMintFee(+formatEther(mintFee));
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
      const data = contract.interface.encodeFunctionData("batchMint", [
        address,
        amount,
      ]);
      return sendTransaction({
        to: contractAddress,
        data,
        value: parseEther((mintFee * amount).toString()).toString(),
      });
    },
    [mintFee, address, chainId, etherProvider, sendTransaction]
  );

  const fetchFriendKeys = useCallback(async () => {
    if (address && chainId) {
      const resp = await covalent.NftService.getNftsForAddress(
        chainId as ChainID,
        address,
        { withUncached: true }
      );
      const contractAddress0 = friendKeyContract.getAddress(chainId, 0);
      const contractAddress1 = friendKeyContract.getAddress(chainId, 1);
      const contractAddress2 = friendKeyContract.getAddress(chainId, 2);
      const filterResp = resp.data.items.filter(
        (item) =>
          item.contract_address.toLowerCase() ===
            contractAddress0.toLowerCase() ||
          item.contract_address.toLowerCase() ===
            contractAddress1.toLowerCase() ||
          item.contract_address.toLowerCase() === contractAddress2.toLowerCase()
      );
      const resID = await Promise.all(
        filterResp.map(async (item) => {
          let level;
          switch (item.contract_address) {
            case contractAddress0:
              level = 0;
              break;
            case contractAddress1:
              level = 1;
              break;
            case contractAddress2:
              level = 2;
              break;
            default:
              level = 0;
          }
          const friendKey = friendKeyContract.getContract(
            chainId,
            level,
            etherProvider
          );
          const data = await Promise.all(
            item.nft_data.map(async (nft) => {
              const balance = (
                await friendKey.balanceOf(address, nft.token_id || 0)
              ).toString();
              if (+balance <= 0) return;
              const uuid = await userManagerContract
                .getContract(chainId, etherProvider)
                .uuids(nft.token_id || 0);
              return {
                balance,
                uuid,
                contractAddress: item.contract_address,
                level: level.toString(),
                tokenId: nft.token_id?.toString() || "0",
                tokenUri: item.nft_data[0].token_url,
                name: "",
                description: item.nft_data[0].external_data.description,
                asset_url: item.nft_data[0].external_data.asset_url,
              };
            })
          );
          return data;
        })
      );
      let data = {} as any;
      resID.forEach((item) => {
        item.forEach((i) => {
          const { balance, contractAddress, level, ...res } = i!;
          if (!data[res.uuid]) {
            data[res.uuid] = {
              ...res,
              tier: [{ balance, contractAddress, level }],
            };
          } else {
            data[res.uuid].tier.push({ balance, contractAddress, level });
          }
        });
      });
      const res = await backend.getUser(Object.keys(data).join(","));
      const formattedData = Object.keys(data).map((key) => {
        const userInfo = res?.data.data.find((item: any) => item.uuid === key);
        return {
          ...data[key],
          name: userInfo?.name || "",
        };
      });
      setFriendKeys(formattedData as FriendKey[]);
    }
  }, [address, chainId, etherProvider]);

  const fetchMintResult = useCallback(
    async (txHash: string) => {
      const level = 0;
      const contract = friendKeyContract.getContract(
        chainId,
        level,
        etherProvider
      );
      const contractAddress = friendKeyContract.getAddress(chainId, level);
      const tx = await etherProvider.getTransaction(txHash);
      if (!tx || !tx.blockNumber) return null;

      const offset = 15;
      const currentBlock = await etherProvider.getBlockNumber();
      const blockOffset =
        tx.blockNumber + offset > currentBlock
          ? currentBlock
          : tx.blockNumber + offset;

      const logs = await etherProvider.getLogs({
        address: contractAddress,
        fromBlock: tx.blockNumber,
        toBlock: blockOffset,
      });

      const parsedLogs = logs
        .reduce((prev, log) => {
          try {
            const parsed = contract.interface.parseLog(log);
            return parsed ? [...prev, parsed] : prev;
          } catch (e) {
            return prev;
          }
        }, [] as ethers.LogDescription[])
        .filter((log) => ["TransferSingle", "TransferBatch"].includes(log.name))
        .filter(
          (log) =>
            log.args["from"] === ethers.ZeroAddress &&
            log.args["to"] === address
        );

      const result: MintedKey[] = parsedLogs.reduce((prev, log) => {
        if (log.name === "TransferSingle") {
          const data = {
            id: +log.args[3].toString(),
            value: +log.args[4].toString(),
          };
          prev = [...prev, data];
        } else {
          const ids = log.args[3];
          const values = log.args[4];
          const dataList = ids.map((id: any, index: any) => ({
            id: +id.toString(),
            value: +values[index].toString(),
          }));
          prev = [...prev, ...dataList];
        }

        return prev;
      }, [] as MintedKey[]);

      return result;
    },
    [chainId, etherProvider, address]
  );

  const waitForMintResult = useCallback(
    (txHash: string) => {
      return new Promise<MintedKey[]>((resolve, reject) => {
        const start = new Date().valueOf();

        const iv = setInterval(async () => {
          const elapse = new Date().valueOf() - start;
          const result = await fetchMintResult(txHash);

          if (result && result.length > 0) {
            clearInterval(iv);
            return resolve(result);
          }

          if (elapse > TIMEOUT) {
            clearInterval(iv);
            return reject("Failed: Timeout");
          }
        }, INTERVAL);
      });
    },
    [fetchMintResult]
  );

  return {
    fetching,
    registered,
    nftId,
    numUsers,
    friendKeys,
    mintFee,
    fetchData,
    fetchFriendKeys,
    register,
    batchMint,
    waitForMintResult,
    fetchMintResult,
  };
};
