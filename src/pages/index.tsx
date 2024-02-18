import MyPostBar from "@/components/Post/MyPostBar";
import PostItem from "@/components/Post/PostItem";
import { FFButton } from "@/components/ui/FFButton";
import { useHydrationFix } from "@/hooks/useHydrationFix";

export default function Home() {
  const isLayoutLoading = useHydrationFix();
  const mockPostList = [
    {
      name: "John Doe",
      createdAt: new Date(),
      content: "Hello, world!",
      image: undefined,
      level: 2,
    },
  ];
  if (isLayoutLoading) return <></>;
  return (
    <div className="text-center text-sm font-sans flex flex-col mt-7 w-full">
      <MyPostBar />
      {mockPostList.map((post, key) => {
        return (
          <>
            <hr className="my-5" />
            <PostItem key={key} {...post} />
          </>
        )
      })}
    </div>
  );
  // TODO: no friend yet
  // return (
  //   <div className="text-center text-sm font-sans flex flex-col justify-center items-center h-screen w-full">
  //     <div>
  //       <h2 className="text-xl font-semibold">Find some friend</h2>
  //       <p className="text-secondary">You have never conneted to anyone yet.</p>
  //       <p className="text-secondary">Let&apos;s discover new friend!</p>
  //     </div>
  //     <div className="w-36">
  //       <FFButton className="w-full text-base">Discover</FFButton>
  //     </div>
  //   </div>
  // );
}
