import React from "react";
import "@particle-network/connectkit/dist/index.css";
import { ConnectButton } from "@particle-network/connectkit";

export default function Topbar() {
  return (
    <div className="w-full h-[80px] shadow border-b flex justify-between items-center px-[70px]">
      <p className="font-bold text-4xl cursor-pointer">FriendFi</p>
      <ConnectButton />
    </div>
  );
}
