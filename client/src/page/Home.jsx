import { useGetPosts } from "../hooks/post/useQueryPost";
import { Post } from "../components/Post";
import { useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthContext";
import { useLikePost, useUnlikePost } from "../hooks/post/useMutationPost";
import { useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [top, setTop] = useState(0);
  const category = searchParams.get("category") || "";
  const filter = searchParams.get("top");
  const { data: posts, isLoading } = useGetPosts(category, top);

  // handle filter post top(by likeCount)
  const handleTop = (top) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (!category) {
      newSearchParams.set("top", top);
    } else {
      newSearchParams.set("category", category);
      newSearchParams.set("top", top);
    }
    setSearchParams(newSearchParams);
    setTop(top);
  };

  // handle newest , delete filter top on search query params
  const handleNewest = (newest) => {
    console.log("done");
    if (filter) {
      searchParams.delete("top");
      setSearchParams(searchParams);
      setTop(newest);
    }
  };

  // handle like or unlike post

  return (
    <div className=" w-full h-full flex flex-col flex-grow gap-y-2 md:pt-0 pt-14">
      <div className=" w-full flex gap-x-3 md:py-0 py-1 px-1 md:px-0">
        <button
          className={` ${
            top === 0 && "font-semibold"
          } px-2 py-2  text-lg hover:bg-white hover:text-blue-600 rounded-md cursor-pointer`}
          onClick={() => handleNewest(0)}>
          Latest
        </button>
        <button
          className={`${
            top === 1 && "font-semibold"
          } px-2 py-2 text-lg hover:bg-white hover:text-blue-600 rounded-md cursor-pointer`}
          onClick={() => handleTop(1)}>
          Top
        </button>
      </div>
      {posts?.data?.map((post) => {
        return <Post post={post} key={post.id} currentUserId={currentUser?.id} />;
      })}
    </div>
  );
};

export default Home;
