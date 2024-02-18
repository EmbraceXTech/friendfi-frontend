import React from "react";

import { formatDateString } from "@/utils/date.util";

import { Button } from "../button";
import More from "@/components/Icon/More";
import MenuTab from "@/components/Menu/MenuTab";
import MoreSheet from "@/components/Menu/MoreSheet";
import { IconName } from "../iconName";
import Merge from "@/components/Icon/Merge";
import MergeSheet from "@/components/Menu/MergeSheet";

export default function ProfileScreen({
  name,
  socialMediaLink,
  userInfo,
  isOpen,
  setIsOpen,
  mode = "me",
}: {
  name: string;
  socialMediaLink: React.ReactNode;
  userInfo?: import("@particle-network/auth-core").UserInfo;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "me" | "friend";
}) {
  const [mergeStateSheet, setMergeStateSheet] = React.useState<
    "merge" | "complete"
  >("merge");
  const handleMerge = () => {
    setMergeStateSheet("complete");
    console.log("merge");
  };
  if (name === "") return <></>;
  return (
    <div className="text-sm font-sans flex flex-col w-full">
      <div className="w-full h-32 bg-[#2B2A4D] relative">
        <div className="absolute -bottom-10 left-3 bg-white p-1 rounded-full">
          <IconName name={name} className="w-20 h-20" />
          {/* <Image
        src={userInfo?.avatar || ""}
        alt="my profile logo"
        width={20}
        height={20}
      /> */}
        </div>
      </div>
      <div className="flex justify-end pt-6 px-6 space-x-2">
        {mode === "me" ? (
          <Button
            className="py-1 rounded-xl bg-[#EAEFF4] text-black focus:bg-[#EAEFF9]"
            onClick={() => mode === "me" && setIsOpen && setIsOpen(true)}
          >
            <More />
          </Button>
        ) : (
          <Button
            className="py-1 rounded-xl"
            onClick={() =>
              mode === "friend" &&
              setIsOpen &&
              (setMergeStateSheet("merge"), setIsOpen(true))
            }
          >
            <Merge />
            Merge
          </Button>
        )}
      </div>
      <div className="flex space-x-2 items-center">
        <h2 className="text-lg font-medium">{name}</h2>
        {socialMediaLink}
      </div>
      <div className="text-secondary mt-3">
        Joined {userInfo && formatDateString(userInfo?.created_at || "")}
      </div>
      <span className="mt-1 text-secondary">
        <span className="text-black">3</span> Common{" "}
        <span className="text-black">0</span> Close{" "}
        <span className="text-black">0</span> Best
      </span>
      <MenuTab name={userInfo?.name || ""} uuid={userInfo?.uuid || ""} />
      {mode === "me" && isOpen && setIsOpen && (
        <MoreSheet isOpenForce={isOpen} setIsOpenForce={setIsOpen} />
      )}
      {mode === "friend" && isOpen && setIsOpen && (
        <MergeSheet
          isOpenForce={isOpen}
          setIsOpenForce={setIsOpen}
          data={{ name, subName: "" }}
          onMerge={handleMerge}
          state={mergeStateSheet}
        />
      )}
    </div>
  );
}
