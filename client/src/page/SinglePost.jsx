import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetComment, useGetOtherPost, useGetSingleLike, useGetSinglePost } from "../hooks/post/useQueryPost";
import { BiComment } from "react-icons/bi";
import { RiHeart2Line } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { Prose } from "../components/Prose";
import { OtherPost } from "../components/post-component/OtherPost";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import urlEncoded from "../../utils/urlEncoded";
import { AuthContext } from "../Providers/AuthContext";
import { Comment } from "../components/post-component/Comment";
import { useAddComment } from "../hooks/post/useMutationPost";
import { useQueryClient } from "@tanstack/react-query";

const SinglePost = () => {
  const { description } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [hideComment, setHideComment] = useState([]);
  const [commentValue, setCommentValue] = useState("");

  const commentRef = useRef(null);
  // get postId from url
  const postId = description.split("-").slice(-5).join("-");

  // useQuery
  const { data: singlePost } = useGetSinglePost(postId);
  const { data: singleLike } = useGetSingleLike(postId);
  const { data: comment } = useGetComment(postId);
  const { data: otherPost } = useGetOtherPost(postId, singlePost?.data?.user?.id);

  console.log(comment);

  // useMutate
  const queryClient = useQueryClient();
  // mutate comment

  const { mutate: addComment, isLoading: loadingAddComment } = useAddComment({
    onSuccess: () => {
      setCommentValue("");
      queryClient.invalidateQueries("comment");
    },
  });

  // handle addComment
  const handleAddComment = () => {
    addComment({
      postId: singlePost?.data?.id,
      text: commentValue,
    });
  };

  const handleHideComment = (id) => {
    if (hideComment.includes(id)) {
      setHideComment((prev) => prev.filter((commentId) => commentId !== id));
    } else {
      setHideComment((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    if (commentRef !== null) {
      commentRef.current.style.height = "90px";
      const scrollHeight = commentRef.current.scrollHeight;
      commentRef.current.style.height = scrollHeight + "px";
    }
  }, [commentRef, commentValue]);

  return (
    <div className=" w-full h-full">
      <div className=" w-full h-full flex gap-x-3">
        <aside className=" lg:w-[10%] top-[78px] sticky z-[9999] h-[calc(100vh-80px)] flex items-end justify-end">
          <div className=" flex flex-col w-fit h-full items-center gap-y-9 pt-16 pr-6">
            <div className=" flex flex-col gap-y-3 items-center">
              <button className=" w-6 h-6 hover:text-yellow-400 text-neutral-600">
                <BiComment className=" w-full h-full " />
              </button>
              <span className=" text-base">{comment?.length}</span>
            </div>
            <div className=" flex flex-col gap-y-3 items-center text-neutral-600">
              <button className=" w-7 h-7">
                <RiHeart2Line className=" w-full h-full" />
              </button>
              <span className=" text-base">{singleLike?.length}</span>
            </div>
            <div className=" flex flex-col gap-y-3 items-center text-neutral-600">
              <button className=" w-[22px] h-[23px]">
                <FaRegBookmark className=" w-full h-full" />
              </button>
              <span className=" text-base">{singleLike?.length}</span>
            </div>
          </div>
        </aside>
        <main className=" lg:w-[60%] h-fit overflow-y-auto flex flex-col gap-y-5 pb-5">
          <div className=" bg-white rounded-md w-full h-full flex flex-col gap-y-8 overflow-hidden">
            {/* cover Post */}
            <div className=" w-full h-80 overflow-hidden object-cover">
              <img src={singlePost?.data?.cover} className=" w-full h-full object-cover" />
            </div>
            {/* heading post */}
            <div className=" w-full px-12 flex flex-col gap-y-6">
              <div className=" w-full flex gap-x-3 items-center">
                {/* pict user */}
                <div className=" w-9 h-9 rounded-full overflow-hidden">
                  <img
                    src={"https://res.cloudinary.com/dbsawioum/image/upload/v1686483684/Blog_app/user.png"}
                    className=" w-full h-full"
                  />
                </div>
                {/* username and date post */}
                <div className=" flex flex-col">
                  <h1 className="font-semibold">{singlePost?.data?.user?.username}</h1>
                  <p className=" text-[12px] text-gray-500">Posted on Jun 22</p>
                </div>
              </div>
              <h1 className=" text-5xl font-bold">{singlePost?.data?.heading}</h1>
              <Prose content={singlePost?.data?.content} />
            </div>
            {/* Comment section */}
            <div className=" border-t py-5 px-12 flex flex-col gap-y-8">
              <h1 className=" font-bold text-[22px]">Latest Comment ({comment?.data?.length})</h1>
              <div className=" flex w-full gap-x-2 h-fit">
                <div className=" w-9 h-9 rounded-full overflow-hidden">
                  <img
                    src={"https://res.cloudinary.com/dbsawioum/image/upload/v1686483684/Blog_app/user.png"}
                    className=" w-full h-full object-cover"
                  />
                </div>
                <div className=" flex flex-grow flex-col gap-y-2">
                  <textarea
                    className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] flex-grow border border-black/40 outline-none focus:border-blue-500 focus:border-2 rounded-md px-2 py-2
                  h-fit resize-none"
                    placeholder="Add to the discussion"
                    ref={commentRef}
                    onChange={(e) => setCommentValue(e.target.value)}
                    value={commentValue}
                  />
                  <div>
                    <button
                      disabled={!commentValue || loadingAddComment}
                      onClick={handleAddComment}
                      className=" py-2 px-4 bg-blue-600 rounded-md hover:bg-blue-400 transition-all ease-in-out duration-200 text-white disabled:bg-blue-400 disabled:cursor-not-allowed">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              {comment?.data?.map((e) => {
                return (
                  <Comment
                    key={e.id}
                    handleHideComment={handleHideComment}
                    hideComment={hideComment}
                    username={e.user.username}
                    userId={e.user.id}
                    text={e.text}
                  />
                );
              })}
            </div>
          </div>
          <div className=" bg-white rounded-md w-full h-full flex flex-col gap-y-8 overflow-hidden px-8 py-9">
            <h1 className=" text-2xl font-bold">
              More from <span className=" text-blue-600">{singlePost?.data?.user?.username}</span>
            </h1>
            {otherPost?.data?.map((e) => {
              console.log(e);
              return (
                <div key={e.id} className=" w-full h-fit gap-y-5 flex flex-col">
                  <div className=" flex flex-col ">
                    <Link to={urlEncoded(singlePost?.data?.user?.username, e.heading, e.id)}>
                      <h1 className=" font-semibold text-2xl hover:text-blue-600">{e.heading}</h1>
                    </Link>
                    <p className=" text-sm text-black/60">{e.createdAt}</p>
                  </div>
                </div>
              );
            })}
            {/* <OtherPost  /> */}
          </div>
        </main>
        {/*card post owner */}
        <aside className=" lg:w-[27%] top-[78px] sticky z-[9999] h-[calc(100vh-80px)] ">
          <div className=" w-full h-fit rounded-md bg-white/60 shadow-[0_0_0.8px_0] shadow-gray-400 flex-col gap-y-3 overflow-hidden pb-3">
            <div className=" bg-black w-full h-9"></div>
            <div className=" w-full h-fit flex gap-x-3 px-4 -translate-y-3">
              <div className=" w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={"https://res.cloudinary.com/dbsawioum/image/upload/v1686483684/Blog_app/user.png"}
                  className=" w-full h-full"
                />
              </div>
              <span className=" self-end pb-1 font-semibold text-xl">{singlePost?.data?.user?.username}</span>
            </div>
            <div className=" flex flex-col px-5 gap-y-4">
              {/* Button Follow */}
              <button className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition-all duration-200 ease-in-out font-medium">
                Follow
              </button>
              {/* bio owner post */}
              <h2 className=" text-black/70">
                Computer Science Bsc. , Data scientist, Machine Learning Engineer, Flutter Developer and Technical
                Writer
              </h2>
              {/* location owner post */}
              <div className=" flex flex-col">
                <h1 className=" text-[15px] font-semibold">Location</h1>
                <h2 className=" text-black/70">Jakarta</h2>
              </div>
              {/* education owner post */}
              <div className=" flex flex-col">
                <h1 className=" text-[15px] font-semibold">Education</h1>
                <h2 className=" text-black/70">Universitas Indonesia</h2>
              </div>
              {/* joined owner post */}
              <div className=" flex flex-col">
                <h1 className=" text-[15px] font-semibold">Joined</h1>
                <h2 className=" text-black/70">Jun 15, 2023</h2>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SinglePost;
