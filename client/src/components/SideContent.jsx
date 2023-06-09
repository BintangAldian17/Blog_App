import React from "react";
import { useGetNews } from "../hooks/usequey/useGetNewsApi";
import { SkeletonNews } from "./Skeleton";

const SideContent = () => {
  const { data, isLoading } = useGetNews();
  return (
    <div className=" w-[40%] h-full lg:flex hidden flex-col ">
      <div className=" w-full h-fit flex flex-col rounded-md bg-white shadow-[0_0_0.8px_0] shadow-gray-400">
        <div className=" w-full px-4 py-2 ">
          <h1 className=" font-medium text-xl">News</h1>
        </div>
        <div className=" w-full h-fit flex flex-col gap-y-2">
          {isLoading ? (
            <SkeletonNews />
          ) : (
            data?.articles.map((e, i) => {
              return (
                <div key={i} className=" w-full flex flex-col ">
                  <a className=" w-full" href={e.url} target="blank">
                    <img src={e.urlToImage} alt="" />
                    <div className=" w-full px-2 pt-1">
                      <h1 className=" text-sm">{`${e.description.slice(0, 100)}...`}</h1>
                    </div>
                  </a>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SideContent;
