import { useMemo, useState } from "react";
import { useAuthCore } from "@particle-network/auth-core-modal";

import { useHydrationFix } from "@/hooks/useHydrationFix";
import { getXProfile } from "@/utils/url.util";
import { Facebook, Google, X } from "@/components/Icon/Social";
import ProfileScreen from "@/components/ui/Screens/ProfileScreen";
import { useRouter } from "next/router";

export default function Friend() {
  const { userInfo } = useAuthCore();
  const [isOpenMerge, setIsOpenMerge] = useState(false);
  const router = useRouter();

  // TODO: handle this
  const name = useMemo(() => {
    return userInfo?.thirdparty_user_info?.user_info
      ? userInfo.thirdparty_user_info?.user_info?.name
      : "";
  }, [userInfo?.thirdparty_user_info?.user_info]);

  const socialMediaLink = useMemo(() => {
    const provider = userInfo?.thirdparty_user_info?.provider;
    switch (provider) {
      case "google":
        return <Google />;
      case "twitterv1":
        return (
          <a href={getXProfile(name)} target="_blank" className="text-blue-400">
            <X />
          </a>
        );
      case "facebook":
        return <Facebook />;
      default:
        return;
    }
  }, [name, userInfo?.thirdparty_user_info?.provider]);

  const isLayoutLoading = useHydrationFix();
  if (isLayoutLoading) return <></>;

  if (!router.query.id)
    return (
      <div className="flex items-center mt-20 w-full justify-center">
        <div className="text-center text-2xl">Not Found 404</div>
      </div>
    );

  return (
    <ProfileScreen
      name={name}
      socialMediaLink={socialMediaLink}
      mode="friend"
      userInfo={userInfo}
      isOpen={isOpenMerge}
      setIsOpen={setIsOpenMerge}
    />
  );
}
