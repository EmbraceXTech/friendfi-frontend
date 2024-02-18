import { IconName } from "../ui/iconName";
import { FriendLevel } from "@/constants/friendLevel";
import { calculateMinutesDifference } from "@/utils/time.util";
import { useEffect, useMemo, useState } from "react";
import { Best, Close, Common } from "../Icon/Role";
import Image from "next/image";

interface PostItemProps {
  name: string;
  createdAt: Date;
  content: string;
  image?: string;
  level: FriendLevel;
}

export default function PostItem({
  name,
  createdAt,
  content,
  image,
  level,
}: PostItemProps) {
  const [postDiff, setPostDiff] = useState<number>(
    calculateMinutesDifference(createdAt)
  );

  const levelIcon = useMemo(() => {
    switch (level) {
      case 3:
        return <Best />;
      case 2:
        return <Close />;
      case 1:
        return <Common />;
      default:
        return <div />;
    }
  }, [level]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPostDiff(calculateMinutesDifference(createdAt));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [createdAt]);
  return (
    <div className="font-sans space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-x-2 flex items-center">
          <IconName name={name} />
          <div className="text-start">
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-tertiary text-xs font-normal">
              {postDiff} minutes ago
            </p>
          </div>
        </div>
        {levelIcon}
      </div>
      <p className="text-start text-sm">{content}</p>
      {image && <Image src={image} alt="post" className="w-full" fill />}
    </div>
  );
}
