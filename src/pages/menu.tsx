import { Button } from "@/components/ui/button";
import { useHydrationFix } from "@/hooks/useHydrationFix";
import { getXProfile } from "@/utils/url.util";
import { useAuthCore, useConnect, useEthereum } from "@particle-network/auth-core-modal";
import { useRouter } from "next/router";

export default function Menu() {
  const router = useRouter();
  const { disconnect } = useConnect();

  const { userInfo } = useAuthCore();
  const { address } = useEthereum();

  const name = userInfo?.thirdparty_user_info?.user_info ? userInfo.thirdparty_user_info?.user_info?.name : "";

  const handleDisconnect = () => {
    disconnect();
    router.replace("/login")
  }

  const isLayoutLoading = useHydrationFix();
  if (isLayoutLoading) return <></>;

  return (
    <div className="text-center text-sm font-sans flex flex-col mt-7 w-full">

      <h1 className="text-lg mt-6 font-bold">Account Info</h1>
      <div>You're logged in as {name}</div>
      <div>Your wallet address is {address}</div>
      <a href={getXProfile(name)} target="_blank" className="text-blue-400">Link to profile</a>

      <Button onClick={handleDisconnect}>Logout</Button>
    </div>
  );
}
