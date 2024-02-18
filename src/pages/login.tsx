import { FFButton } from "@/components/ui/FFButton";
import { ConnectButton } from "@particle-network/connectkit";
import React from "react";
import MainLayout from "@/components/ui/Layout/MainLayout";
import "@particle-network/connectkit/dist/index.css";

export default function Login() {
  return (
    <MainLayout>
      <div className="h-full w-full flex flex-col pt-[100px] pb-[80px]">
        <div className="flex flex-col items-center">
          <div className="w-[90px] h-[90px] bg-yellow-200 rounded-xl" />
          <p className="font-bold text-3xl mt-[30px]">The future of Social</p>
          <p className="px-[100px] text-center mt-[5px] text-sm text-gray-500">
            You’ll use ETH on mainnet to buy and sell passes on FriendFi
          </p>
        </div>
        <div className="mt-[270px]">
          <ConnectButton.Custom>
            {({ openConnectModal }) => {
              return (
                <FFButton
                  size="lg"
                  className="w-[350px] mx-auto"
                  onClick={openConnectModal}
                >
                  Sign In
                </FFButton>
              );
            }}
          </ConnectButton.Custom>
          <p className="text-center text-xs px-[80px] mt-16 text-gray-400">
            By continuing, you agree to FriendFi’s Terms of Service and confirm
            that you are at least 13 years old.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
