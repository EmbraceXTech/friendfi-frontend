import React, { useEffect, useState } from "react";
import "@particle-network/connectkit/dist/index.css";
import { useFriendFi } from "@/hooks/useFriendFi";
import { Button } from "@/components/ui/button";
import { useEthereum, useAuthCore, useConnect } from "@particle-network/auth-core-modal";
import { useHydrationFix } from "@/hooks/useHydrationFix";
import { useBalance } from "@/hooks/useBalance";
import { useRouter } from "next/router";

// This is the test page to try contract connection

export default function Test() {

    const router = useRouter();

    const { disconnect } = useConnect();
    const { userInfo } = useAuthCore();
    const { address, chainInfo } = useEthereum();
    const { registered, nftId, nftPrice, numUsers, register, batchMint, addMintListener, removeMintListener } = useFriendFi();
    const balance = useBalance();

    const [mintAmount, setMintAmount] = useState("1");
    const [pendingTxs, setPendingTxs] = useState<string[]>([]);

    const name = userInfo?.thirdparty_user_info?.user_info ? userInfo.thirdparty_user_info?.user_info?.name : "";
    const uuid = userInfo ? userInfo.uuid : "";

    const getXProfile = (name: string) => {
        return `https://x.com/${name}`;
    }

    const handleDisconnect = () => {
        disconnect();
        router.replace("/login")
    }

    const handleMint = async () => {
        try {
            const txHash = await batchMint(+mintAmount);
            alert(`Submitted transaction: ${txHash}`);
            setPendingTxs([...pendingTxs, txHash]);
        } catch (e) {
            console.error(e);
        }
    }

    // Listen to mint event and display success status
    useEffect(() => {
        const id = addMintListener((level: number, operator: string, from: string, to: string, ids: bigint[], values: bigint[], txHash: string) => {
            const txIndex = pendingTxs.findIndex(hash => hash === txHash);
            if (txIndex >= 0) {
                alert(`Mint success: ${JSON.stringify({ level, operator, from, to, ids, values, txHash })}`);
                setPendingTxs(pendingTxs.filter((_, id) => id !== txIndex));
            }
        })

        return () => {
            removeMintListener(id);
        }
    }, [setPendingTxs]);

    if (useHydrationFix()) return <></>

    return (
        <div className="h-full w-full flex flex-col pt-[100px] pb-[80px]">
            {/* Account info */}
            <h1 className="text-lg mt-6 font-bold">Account Info</h1>
            <div>You're logged in as {name}</div>
            <div>Your wallet address is {address}</div>
            <div>Your UUID is {uuid}</div>
            <div>You have {balance.value} ETH</div>
            <a href={getXProfile(name)} target="_blank" className="text-blue-400">Link to profile</a>

            {/* Network info */}
            <h1 className="text-lg mt-6 font-bold">Network Info</h1>
            <div>The current chain is: {chainInfo.fullname}</div>
            <div>Chain id is: {chainInfo.id}</div>

            {/* Register section */}
            <h1 className="text-lg mt-6 font-bold">Register</h1>
            {
                !registered ? (
                    <div>
                        <div>You haven't registered</div>
                        <div>
                            <Button onClick={register}>Register</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>You have registered</div>
                        <div>NFT ID: {nftId}</div>
                        <div>NFT Price: {nftPrice} ETH</div>
                    </div>
                )
            }

            {/* Mint Section */}
            <h1 className="text-lg mt-6 font-bold">Mint</h1>
            <div>Total users: {numUsers} users</div>
            <div>Mint amount: <input type="number" className="border px-2 py-1" id="mintAmount" name="mintAmount" value={mintAmount} onChange={e => setMintAmount(e.target.value)} /></div>
            <div>
                <Button onClick={handleMint}>Mint</Button>
            </div>

            {/* Menu */}
            <h1 className="text-lg mt-6 font-bold">Menu</h1>
            <div>
                <Button onClick={handleDisconnect}>Logout</Button>
            </div>

        </div>
    );
}