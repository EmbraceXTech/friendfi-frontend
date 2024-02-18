import { Button } from "@/components/ui/button";
import { useFriendFi } from "@/hooks/useFriendFi";
import { backend } from "@/services/backend";
import { useConnect } from "@particle-network/auth-core-modal";
import { useAuthCore } from "@particle-network/auth-core-modal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const INTERVAL = 15 * 1000;

export default function Reigster() {
  const router = useRouter();
  const { registered, fetching, register, fetchData } = useFriendFi();
  const { disconnect } = useConnect();
  const { userInfo } = useAuthCore();

  const [registering, setRegistering] = useState(false);
  const [iv, setIv] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (registered) {
      router.push("/");

      if (iv) {
        clearInterval(iv);
        setIv(null);
      }
    }

    return () => {
      if (iv) {
        clearInterval(iv);
        setIv(null);
      }
    }
  }, [registered, router, iv]);

  useEffect(() => {
    if (userInfo) {
      const uuid = userInfo.uuid;
      const token = userInfo.token;
      backend.register(uuid, token).then(res => {
        console.log("Register: ", res);
      }).catch(e => {
        console.error(e);
      })
    }
  }, [userInfo]);

  const handleRegister = async () => {
    try {
      await register();
      setRegistering(true);

      const iv = setInterval(async () => {
        await fetchData();
      }, INTERVAL);
      setIv(iv);
    } catch (e) {
      console.error(e);
    }
  }

  if (fetching || registered) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center font-sans text-center">
        <PuffLoader color="#FDE047" size={150} />
      </div>
    )
  }

  if (!registering) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center font-sans">
        <div>Oh, You're new here.</div>
        <div>Please complete the registration.</div>
        <div>Make sure you top up some gas to your wallet.</div>
        <div>(check your wallet on the buttom right corner)</div>

        <Button onClick={handleRegister}>Register</Button>
        <Button onClick={disconnect}>Cancel</Button>
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center font-sans text-center">
      <PuffLoader color="#FDE047" size={150} />
      <div>The process will take around 1 minute.</div>
      <div>Once it's done, you will be automatically directed into the new world.</div>
      <div>Feel free to grab some water. It should be finishe by then...</div>
    </div>
  );
}
