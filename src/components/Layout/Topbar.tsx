import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useFriendFi } from "@/hooks/useFriendFi";
import { Search, Notification } from "../Icon";

// TODO: handle this
export default function Topbar() {
  const pathname = usePathname();
  const {} = useFriendFi();

  const Header = useMemo(() => {
    switch (pathname) {
      case "/":
        return (
          <div className="flex justify-between items-end">
            <h1 className="text-brand text-2xl font-sans font-bold">
              FriendFi
            </h1>
            <div className="flex space-x-2">
              <Search />
              <Notification />
            </div>
          </div>
        );
      // return (
      //   <div className="flex justify-end">
      //     <Search />
      // <Notification />
      //   </div>
      // );
      case "/friends":
        return (
          <div className="flex justify-between items-end">
            <div />
            <h1 className="text-lg font-sans font-medium">Friends</h1>
            <div className="flex space-x-2">
              <Search />
              <Notification />
            </div>
          </div>
        );
      case "/market":
        return (
          <div className="flex justify-between items-end">
            <div />
            <h1 className="text-lg font-sans font-medium">Marketplace</h1>
            <div className="flex space-x-2">
              <Search />
              <Notification />
            </div>
          </div>
        );
      default:
        return;
    }
  }, [pathname]);

  return <div className="w-full pt-6">{Header}</div>;
}