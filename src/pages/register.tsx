import { useFriendFi } from "@/hooks/useFriendFi";
import { useConnect } from "@particle-network/auth-core-modal";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PuffLoader } from "react-spinners";

export default function Reigster() {
  const router = useRouter();
  const { registered, register, fetching, isFetching } = useFriendFi();
  const { disconnect } = useConnect();

  useEffect(() => {
    if (registered) {
      router.push("/");
    }
  }, [registered, router]);

  useEffect(() => {
    if (!registered && !isFetching) {
      console.log("registered: ", registered);
      (async () => {
        try {
          await register();
          await fetching();
        } catch (e: any) {
          if (e.code === 4001 || e.code === 40104) {
            console.log("User rejected request");
            disconnect();
          }
          console.error(e);
        }
      })();
    }
  }, [registered, router, isFetching]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <PuffLoader color="#FDE047" size={150} />
    </div>
  );
}
