import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { FFButton } from "../ui/FFButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import FriendFoundCard from "./FriendFoundCard";

export default function RandomSuccessSheet({
  isOpenForce = false,
}: {
  isOpenForce?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(isOpenForce);
  const { width, height } = useWindowSize();

  // Mock
  const foundFriends = [
    {
      name: "Vitalik Buterin",
      subName: "vitalik.eth",
      amount: 1,
    },
    {
      name: "Lisa Blackpink",
      subName: "lalalisa",
      amount: 5,
    },
    {
      name: "Lisa Blackpink1",
      subName: "lalalisa",
      amount: 3,
    },
    {
      name: "Lisa Blackpink2",
      subName: "lalalisa",
      amount: 15,
    },
  ];

  useEffect(() => {
    setIsOpen(isOpenForce);
  }, [isOpenForce]);
  return (
    <Sheet open={isOpen}>
      <SheetContent className="font-serif h-full" side="bottom">
        <SheetHeader className="h-full max-w-[500px] mx-auto py-6">
          <SheetDescription className="min-h-52 font-sans flex flex-col justify-between items-center text-center text-black h-full">
            <div />
            <div className="space-y-3 flex flex-col items-center">
              <Carousel>
                <CarouselContent>
                  {foundFriends.map((friend, index) => (
                    <CarouselItem key={index} className="basis-1/3">
                      <FriendFoundCard {...friend} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {foundFriends.length > 3 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
              <div className="font-medium text-2xl pt-6">
                You got new friends!
              </div>
              <div className="text-tertiary text-sm">
                Congratulations! You have proven your friends <br />
                and unlocked a discover badge
              </div>
            </div>
            <div className="w-full">
              <FFButton
                className="font-serif w-full"
                onClick={() => setIsOpen(false)}
              >
                Find More friend
              </FFButton>
            </div>
            <Confetti width={width} height={height} recycle={false} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
