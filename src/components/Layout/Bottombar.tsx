import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { BOTTOM_MENU_ITEMS } from "@/constants/menu";
import React from "react";

export default function Bottombar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex justify-center border p-3 rounded-full shadow-sm absolute bottom-0 px-10 mb-5 z-20 left-5 right-5">
      <div className="flex items-center space-x-12 select-none text-gray-800">
        {BOTTOM_MENU_ITEMS.map((item) => {
          const isActived =
            item.path === "/" ? pathname === "/" : pathname.includes(item.path);
          return (
            <div
              onClick={() => router.push(item.path)}
              key={item.path}
              className={`flex flex-col items-center ${
                isActived ? "cursor-default" : "cursor-pointer hover:opacity-70"
              }`}
            >
              <div className="w-6 h-6">
                <item.icon strokeWidth={isActived ? 2.5 : 2} />
              </div>
              <p className={`${isActived ? "font-semibold" : "font-normal"}`}>
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
