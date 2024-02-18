import FriendCard from "@/components/Friends/FriendCard";
import RandomLoadingSheet from "@/components/Friends/RandomLoadingSheet";
import RandomSuccessSheet from "@/components/Friends/RandomSuccuessSheet";
import Present from "@/components/Icon/Present";
import { FFButton } from "@/components/ui/FFButton";
import { IconName } from "@/components/ui/iconName";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBalance } from "@/hooks/useBalance";
import { useMemo, useState } from "react";

export default function Friends() {
  const { value } = useBalance();
  const [randomAmount, setRandomAmount] = useState(0);
  const [currentTab, setCurrentTab] = useState<"discover" | "listFriends">(
    "listFriends"
  );

  // mock
  const free = 5;
  const friendsList = [
    {
      name: "Vitalik Buterin",
      subName: "vitalik.eth",
      keys: {
        common: 5,
        close: 3,
        best: 2,
      },
    },
    {
      name: "Lisa Blackpink",
      subName: "lalalisa",
      keys: {
        common: 10,
        close: 4,
        best: 1,
      },
    },
  ];

  const handleRandomAmount = (amount: number) => {
    setRandomAmount((randomAmount) =>
      randomAmount + amount > 0 ? randomAmount + amount : 0
    );
  };
  const openPrice = useMemo(() => {
    return (randomAmount - free > 0 ? randomAmount - free : 0) * 0.02;
  }, [randomAmount]);
  const openFree = useMemo(() => {
    return free - randomAmount > free ? free - randomAmount : randomAmount;
  }, [randomAmount]);
  const openText = useMemo(() => {
    return openPrice > value
      ? `Insuffient Funds: ${openPrice} ETH`
      : `Open ${openFree > 0 ? `${openFree} Free` : ""}
    ${openFree > 0 && openPrice > 0 ? " + " : ""}
    ${openPrice > 0 ? `${openPrice} ETH` : ""}`;
  }, [openFree, openPrice, value]);
  return (
    <div className="pt-7 font-sans">
      <Tabs
        defaultValue="listFriends"
        value={currentTab}
        onValueChange={(value) =>
          setCurrentTab(value as "discover" | "listFriends")
        }
        className="w-full h-full"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="discover">
            <div className="flex items-center space-x-1">
              <div>Discover</div>
              {free && free > 0 && (
                <div className="border border-[#E6E6E8] text-secondary text-xs rounded-lg px-2">
                  {free}
                </div>
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger value="listFriends">List Friends</TabsTrigger>
        </TabsList>
        <hr />
        <TabsContent
          value="discover"
          className="text-center py-1 flex flex-col items-center px-1"
        >
          <h2 className="text-xl font-semibold mt-5">Discover new friends</h2>
          <p className="text-secondary text-sm">
            Every mystery box contains a Friends reward
            <br /> and unlocked a discover badge
          </p>
          <div className="my-10">
            <Present />
          </div>
          <div className="flex justify-center space-x-3 items-center">
            <button onClick={() => handleRandomAmount(-1)}>
              <IconName name="-" className="bg-white border" />
            </button>
            <div>{randomAmount}</div>
            <button onClick={() => handleRandomAmount(1)}>
              <IconName name="+" className="bg-white border" />
            </button>
          </div>
          <RandomLoadingSheet
            disabled={randomAmount === 0 || openPrice > value}
            textPrice={openText}
          >
            <FFButton
              className="w-full text-base mt-3"
              disabled={randomAmount === 0 || openPrice > value}
            >
              {openText}
            </FFButton>
          </RandomLoadingSheet>
          <RandomSuccessSheet isOpenForce={true} />
          <div className="text-secondary text-sm my-3">
            Your Balance: <span className="font-semibold">{value} ETH</span>
          </div>
        </TabsContent>
        <TabsContent
          value="listFriends"
          className="text-center text-sm font-sans flex flex-col justify-center items-center h-full w-full space-y-3"
        >
          {friendsList.map((friend, index) => (
            <FriendCard {...friend} key={index} />
          ))}
          {/* <div className="mt-[200px]">
            <h2 className="text-xl font-semibold">Find some friend</h2>
            <p className="text-secondary">
              You have never conneted to anyone yet.
            </p>
            <p className="text-secondary">Let&apos;s discover new friend!</p>
          </div>
          <div className="w-36 mt-6">
            <FFButton
              className="w-full text-base"
              onClick={() => setCurrentTab("discover")}
            >
              Discover
            </FFButton>
          </div> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
