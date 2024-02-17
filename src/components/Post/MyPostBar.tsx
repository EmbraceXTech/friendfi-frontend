import { useAuthCore } from "@particle-network/auth-core-modal";
import { IconName } from "../ui/iconPost";
import { Picture } from "../Icon";
import { useMemo } from "react";
import { useHydrationFix } from "@/hooks/useHydrationFix";

export default function MyPostBar() {
  const { userInfo } = useAuthCore();

  const name = useMemo(() => {
    return userInfo?.thirdparty_user_info?.user_info
      ? userInfo.thirdparty_user_info?.user_info?.name
      : "";
  }, [userInfo?.thirdparty_user_info?.user_info]);
  return (
    <div className="flex justify-between items-center">
      <div className="space-x-2 flex items-center">
        <IconName name={name} />
        <p className="text-tertiary text-sm">What&apos;s on your mind?</p>
      </div>
      <Picture />
    </div>
  );
}
