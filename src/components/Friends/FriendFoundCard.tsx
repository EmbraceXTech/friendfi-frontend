import { Common } from "../Icon/Role";
import { IconName } from "../ui/iconName";

interface FriendFoundCardProps {
  name: string;
  subName: string;
  amount: number;
}

export default function FriendFoundCard({
  name,
  subName,
  amount,
}: FriendFoundCardProps) {
  return (
    <div className="flex flex-col items-center border rounded-3xl py-10 px-6 font-sans space-y-3 relative">
      <IconName name={name} className="w-16 h-16" />
      <div>
        <div className="font-semibold text-base">{name}</div>
        <div className="text-tertiary text-xs">{subName}</div>
      </div>
      <Common />
      <div className="text-lg">{amount}</div>
    </div>
  );
}
