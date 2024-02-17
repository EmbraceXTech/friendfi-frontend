import { capitalizeFirstLetter } from "@/utils/string.util";

export const IconName = ({ name }: { name: string }) => {
  return (
    <div className="text-xl font-sans bg-brand w-10 h-10 rounded-full flex items-center justify-center">
      {capitalizeFirstLetter(name)}
    </div>
  );
};
