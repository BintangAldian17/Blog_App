import { useContext } from "react";
import { BiComment, BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useLikePost, useUnlikePost } from "../hooks/post/useMutationPost";
import { Link } from "react-router-dom";
import urlEncoded from "../../utils/urlEncoded";

export const Post = ({ post, currentUserId }) => {
  const queryClient = useQueryClient();

  // likePost
  const { mutate: likePost } = useLikePost({
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
  // unlike post
  const { mutate: unlikePost } = useUnlikePost({
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const handlelikePost = (postId) => {
    if (currentUserId) {
      if (post.like.includes(currentUserId)) return unlikePost(postId);
      return likePost({ postId: postId });
    }
  };
  return (
    <Link to={urlEncoded(post.user.username, post.heading, post.id)} className="w-full h-fit">
      <div
        className=" w-full h-fit flex flex-col gap-y-2  md:rounded-md bg-white shadow-[0_0_0.8px_0] shadow-gray-400 overflow-hidden cup"
        key={post?.id}>
        {/* post image */}
        <img src={post?.cover} className=" w-full md:h-80  h-48 object-cover" />
        {/* content */}
        <div className=" w-full h-fit flex md:flex-row flex-col gap-y-3 md:gap-y-0 px-5 py-3">
          {/* Profile Post */}
          <div className=" w-fit h-full md:block flex gap-x-3">
            <div className=" w-9 h-9 rounded-full overflow-hidden">
              <img
                src={"https://res.cloudinary.com/dbsawioum/image/upload/v1686483684/Blog_app/user.png"}
                alt="user"
                className=" w-full h-full object-cover"
              />
            </div>
            {/* when md hidden */}
            <div className="  flex-grow flex flex-col md:hidden ">
              <span className=" text-[15px] font-medium">{post?.user.username}</span>
              <span className="text-sm font-normal">Jun 9</span>
            </div>
          </div>
          <div className=" md:px-4 flex flex-col gap-y-3 w-full">
            {/* when small hidden */}
            <div className=" w-full md:flex flex-col hidden ">
              <span className=" text-[15px] font-medium">{post?.user.username}</span>
              <span className="text-sm font-normal">Jun 9</span>
            </div>
            {/* title post */}
            <h1 className=" md:text-3xl text-xl font-bold cursor-pointer hover:text-blue-600 transition-colors duration-200 ease-in-out">
              {post?.heading}
            </h1>
            {/* Category */}
            <div className=" w-fit h-fit">
              <div className=" md:px-5 px-4 py-1 bg-gray-100 rounded-full cursor-pointer text-sm md:text-base">
                {post?.category_name}
              </div>
            </div>
            {/* Post Feature */}
            <div className=" w-full pt-2 flex items-center justify-between">
              {/* reaction And Comment */}
              <div className=" flex md:gap-x-4 gap-x-2 items-center">
                {/* reaction */}
                <div className=" flex gap-x-2 items-center hover:bg-slate-100 py-2 rounded-md cursor-pointer px-2 transition-all ease-in-out duration-200">
                  {currentUserId ? (
                    <button className=" w-5 h-5" onClick={() => handlelikePost(post?.id)}>
                      {post.like.includes(currentUserId) ? (
                        <AiFillLike className=" w-full h-full text-black" />
                      ) : (
                        <BiLike className=" w-full h-full text-black" />
                      )}
                    </button>
                  ) : (
                    <button className=" w-5 h-5">
                      <BiLike className=" w-full h-full text-black" />
                    </button>
                  )}
                  <span className=" text-sm text-gray-500">{post?.likesCount}</span>
                </div>
                <div className=" flex gap-x-2 items-center hover:bg-slate-100 py-2 rounded-md cursor-pointer px-2 transition-all ease-in-out duration-200">
                  <button className=" w-5 h-5">
                    <BiComment className=" w-full h-full text-black" />
                  </button>
                  <span className=" text-sm text-gray-500">
                    {post.commentCount === 0 ? "Add Comment" : `${post.commentCount} Comments`}
                  </span>
                </div>
              </div>
              <div className=" md:py-3 md:px-2 hover:bg-gray-100 transition-all ease-in-out duration-200 group cursor-pointer">
                <div className=" md:w-6 md:h-6 h-5 w-5">
                  <FaRegBookmark className=" w-full h-full group-hover:text-blue-600 " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
