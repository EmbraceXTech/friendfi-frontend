import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostItem from "../Post/PostItem";

export default function MenuTab() {
  const [currentTab, setCurrentTab] = useState<"post" | "statistics">("post");
  const mockPostList = [
    {
      name: "John Doe",
      createdAt: new Date(),
      content: "Hello, world!",
      image: undefined,
      level: 2,
    },
  ];
  return (
    <div className="pt-7 font-sans">
      <Tabs
        defaultValue="post"
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as "post" | "statistics")}
        className="w-full h-full"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="post">Post</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>
        <hr />
        <TabsContent value="post" className="flex flex-col px-1">
          {mockPostList.map((post, key) => {
            return (
              <>
                <PostItem key={key} {...post} />
                <hr className="my-5" />
              </>
            );
          })}
        </TabsContent>
        <TabsContent
          value="statistics"
          className="text-center text-sm font-sans flex flex-col justify-center items-center h-full w-full space-y-3"
        >
          Statistics covalent...
        </TabsContent>
      </Tabs>
    </div>
  );
}
