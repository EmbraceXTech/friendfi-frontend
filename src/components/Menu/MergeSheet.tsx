import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import Confetti from "react-confetti";
import { X, ArrowBigUpDash } from "lucide-react";
import {
  useAuthCore,
  useConnect,
  useEthereum,
} from "@particle-network/auth-core-modal";
import { useRouter } from "next/router";
import useWindowSize from "react-use/lib/useWindowSize";

import { FFButton } from "../ui/FFButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { IconName } from "../ui/iconName";
import FriendFoundCard from "../Friends/FriendFoundCard";
import { Best, Close, Common } from "../Icon/Role";
import Check from "../Icon/Check";

import { truncateString } from "@/utils/string.util";
import { cn } from "@/lib/utils";

export default function MergeSheet({
  data,
  isOpenForce = false,
  setIsOpenForce,
  state,
  onMerge,
}: {
  data: {
    name: string;
    subName: string;
  };
  isOpenForce: boolean;
  setIsOpenForce: Dispatch<SetStateAction<boolean>>;
  state: "merge" | "complete";
  onMerge?: () => void;
}) {
  const router = useRouter();
  const { disconnect } = useConnect();
  const { chainInfo, address } = useEthereum();
  const { userInfo } = useAuthCore();
  const { width, height } = useWindowSize();

  const [tierUsed, setTierUsed] = useState(0);

  const amount = 2;

  console.log(userInfo);

  const Tier = useCallback((tier: number) => {
    switch (tier) {
      case 0:
        return <Common />;
      case 1:
        return <Close />;
      case 2:
        return <Best />;
      default:
        return <Common />;
    }
  }, []);

  const TierText = useCallback((tier: number) => {
    switch (tier) {
      case 0:
        return "Common";
      case 1:
        return "Close";
      case 2:
        return "Best";
      default:
        return "Common";
    }
  }, []);
  const Content = useMemo(() => {
    switch (state) {
      case "merge":
        return (
          <>
            <div className="flex flex-col justify-center items-center w-full">
              <div className="w-1/3">
                <FriendFoundCard
                  name={data.name}
                  subName={data.subName}
                  amount={0}
                  className="py-4"
                  tier={tierUsed + 1}
                />
              </div>
              <ArrowBigUpDash width={100} height={100} />
              <div className="flex space-x-10">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    className={cn("flex flex-col items-center relative")}
                    key={index}
                  >
                    {Tier(tierUsed)}
                    <div className="absolute -z-10 top-2">
                      <IconName
                        name={data.name}
                        className={cn(
                          "w-20 h-20",
                          amount >= index + 1 && "opacity-50"
                        )}
                      />
                    </div>
                    {amount >= index + 1 && (
                      <div className="absolute top-10">
                        <Check />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <FFButton className="w-full mt-20" onClick={onMerge}>
              Merge Now
            </FFButton>
          </>
        );
      case "complete":
        return (
          <>
            <div className="flex flex-col justify-center items-center w-full space-y-3">
              <div className="w-1/2">
                <FriendFoundCard
                  name={data.name}
                  subName={data.subName}
                  amount={0}
                  className=""
                  tier={tierUsed + 1}
                />
              </div>
              <div className="text-xl text-center font-medium">
                Your merge {TierText(tierUsed + 1)} friend on <br /> this level!
              </div>
              <div className="text-tertiary text-sm text-center">
                Now you can access to the close friend content. <br />
                You become a close friend of Vitalik Buterin
              </div>
            </div>
            <FFButton
              className="w-full mt-20"
              onClick={() => setIsOpenForce(false)}
            >
              Got it
            </FFButton>
            <Confetti width={width} height={height} recycle={false} />
          </>
        );
      default:
        return;
    }
  }, [state, data.name, data.subName, tierUsed, onMerge, TierText, width, height, Tier, setIsOpenForce]);
  return (
    <Sheet open={isOpenForce}>
      <SheetContent className="font-serif rounded-t-2xl h-[80%]" side="bottom">
        <SheetHeader className="h-full max-w-[500px] mx-auto">
          <SheetTitle className="flex justify-between items-center">
            <div />
            {state === "merge" && <div>Merge</div>}
            <SheetTrigger
              onClick={() => setIsOpenForce(false)}
              className="text-secondary"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </SheetTrigger>
          </SheetTitle>
          <SheetDescription className="flex flex-col text-start text-black pt-2 space-y-3 w-full">
            {Content}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
