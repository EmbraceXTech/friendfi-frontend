import React, { useEffect } from "react";
import { useAccount } from "@particle-network/connectkit";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const account = useAccount();

  useEffect(() => {
    if (pathname !== "/login" && !account) {
      router.replace("/login");
    }
    if (pathname === "/login" && account !== undefined) {
      router.replace("/");
    }
  }, [account, pathname, router]);

  return <>{children}</>;
}
