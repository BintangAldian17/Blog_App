export const SkeletonNews = () => {
  return (
    <>
      <div className={`  bg-gray-700/60 animate-pulse w-full h-36`}></div>
      <div className=" flex flex-col w-full gap-y-1">
        <div className={`  bg-gray-700/60 animate-pulse w-[70%] h-4 rounded-lg`}></div>
        <div className={`  bg-gray-700/60 animate-pulse w-[50%] h-4 rounded-full`}></div>
        <div className={`  bg-gray-700/60 animate-pulse w-[59%] h-4 rounded-full`}></div>
      </div>
      <div className={`  bg-gray-700/60 animate-pulse w-full h-36`}></div>
      <div className=" flex flex-col w-full gap-y-1">
        <div className={`  bg-gray-700/60 animate-pulse w-[70%] h-4 rounded-lg`}></div>
        <div className={`  bg-gray-700/60 animate-pulse w-[50%] h-4 rounded-full`}></div>
        <div className={`  bg-gray-700/60 animate-pulse w-[59%] h-4 rounded-full`}></div>
      </div>
    </>
  );
};
