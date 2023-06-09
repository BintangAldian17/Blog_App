import { FaRegBookmark } from "react-icons/fa";
import post from "../assets/image2.jpg";
import user from "../assets/test.png";
import { BiComment, BiLike } from "react-icons/bi";

const Home = () => {
  return (
    <div className=" w-full h-full flex flex-col flex-grow gap-y-2">
      <div className=" w-full flex gap-x-3 md:py-0 py-1 px-1 md:px-0">
        <div className=" px-2 py-2 font-semibold text-lg hover:bg-white hover:text-blue-600 rounded-md cursor-pointer">
          Latest
        </div>
        <div className=" px-2 py-2 text-lg hover:bg-white hover:text-blue-600 rounded-md cursor-pointer">Top</div>
      </div>
      <div className=" w-full h-fit flex flex-col gap-y-2  md:rounded-md bg-white shadow-[0_0_0.8px_0] shadow-gray-400 overflow-hidden cup">
        {/* post image */}
        <img src={post} className=" w-full md:h-72 h-48 object-cover" />
        {/* content */}
        <div className=" w-full h-fit flex md:flex-row flex-col gap-y-3 md:gap-y-0 px-5 py-3">
          {/* Profile Post */}
          <div className=" w-fit h-full md:block flex gap-x-3">
            <div className=" w-9 h-9 rounded-full overflow-hidden">
              <img src={user} alt="user" className=" w-full h-full object-cover" />
            </div>
            {/* when md hidden */}
            <div className="  flex-grow flex flex-col md:hidden ">
              <span className=" text-[15px] font-medium">Bintang Aldian</span>
              <span className="text-sm font-normal">Jun 9</span>
            </div>
          </div>
          <div className=" md:px-4 flex flex-col gap-y-3 w-full">
            {/* when small hidden */}
            <div className=" w-full md:flex flex-col hidden ">
              <span className=" text-[15px] font-medium">Bintang Aldian</span>
              <span className="text-sm font-normal">Jun 9</span>
            </div>
            {/* title post */}
            <h1 className=" md:text-3xl text-xl font-bold cursor-pointer hover:text-blue-600 transition-colors duration-200 ease-in-out">
              Lorem ipsum dolor sit amet consectetur.
            </h1>
            {/* Category */}
            <div className=" w-fit h-fit">
              <div className=" md:px-5 px-4 py-1 bg-gray-100 rounded-full cursor-pointer text-sm md:text-base">
                Game
              </div>
            </div>
            {/* Post Feature */}
            <div className=" w-full pt-2 flex items-center justify-between">
              {/* reaction And Comment */}
              <div className=" flex md:gap-x-4 gap-x-2 items-center">
                {/* reaction */}
                <div className=" flex gap-x-2 items-center hover:bg-slate-100 py-2 rounded-md cursor-pointer px-2 transition-all ease-in-out duration-200">
                  <button className=" w-5 h-5">
                    <BiLike className=" w-full h-full text-black" />
                  </button>
                  <span className=" text-sm text-gray-500">1</span>
                </div>
                <div className=" flex gap-x-2 items-center hover:bg-slate-100 py-2 rounded-md cursor-pointer px-2 transition-all ease-in-out duration-200">
                  <button className=" w-5 h-5">
                    <BiComment className=" w-full h-full text-black" />
                  </button>
                  <span className=" text-sm text-gray-500">1</span>
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
      <div className=" w-full h-fit flex flex-col gap-y-2  md:rounded-md bg-white shadow-[0_0_0.8px_0] shadow-gray-400 overflow-hidden cup">
        {/* post image */}
        <img src={post} className=" w-full md:h-72 h-48 object-cover" />
        {/* content */}
        <div className=" w-full h-fit flex md:flex-row flex-col gap-y-3 md:gap-y-0 px-5 py-3">
          {/* Profile Post */}
          <div className=" w-fit h-full md:block flex gap-x-3">
            <div className=" w-9 h-9 rounded-full overflow-hidden">
              <img src={user} alt="user" className=" w-full h-full object-cover" />
            </div>
            {/* when md hidden */}
            <div className="  flex-grow flex flex-col md:hidden ">
              <span className=" text-[15px] font-medium">Bintang Aldian</span>
              <span className="text-sm font-normal">Jun 9</span>
            </div>
          </div>
          <div className=" md:px-4 flex flex-col gap-y-3 w-full">
            {/* when small hidden */}
            <div className=" w-full md:flex flex-col hidden ">
              <span className=" text-[15px] font-medium">Bintang Aldian</span>
              <span className="text-sm font-normal">Jun 9</span>
            </div>
            {/* title post */}
            <h1 className=" md:text-3xl text-xl font-bold cursor-pointer hover:text-blue-600 transition-colors duration-200 ease-in-out">
              Lorem ipsum dolor sit amet consectetur.
            </h1>
            {/* Category */}
            <div className=" w-fit h-fit">
              <div className=" md:px-5 px-4 py-1 bg-gray-100 rounded-full cursor-pointer text-sm md:text-base">
                Game
              </div>
            </div>
            {/* Post Feature */}
            <div className=" w-full pt-2 flex items-center justify-between">
              {/* reaction And Comment */}
              <div className=" flex md:gap-x-4 gap-x-2 items-center">
                {/* reaction */}
                <div className=" flex gap-x-2 items-center hover:bg-slate-100 py-2 rounded-md cursor-pointer px-2 transition-all ease-in-out duration-200">
                  <button className=" w-5 h-5">
                    <BiLike className=" w-full h-full text-black" />
                  </button>
                  <span className=" text-sm text-gray-500">1</span>
                </div>
                <div className=" flex gap-x-2 items-center hover:bg-slate-100 py-2 rounded-md cursor-pointer px-2 transition-all ease-in-out duration-200">
                  <button className=" w-5 h-5">
                    <BiComment className=" w-full h-full text-black" />
                  </button>
                  <span className=" text-sm text-gray-500">1</span>
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
      <div className=" w-full h-fit flex flex-col gap-y-2  md:rounded-md bg-white shadow-[0_0_0.8px_0] shadow-gray-400 overflow-hidden cup">
        {/* post image */}
        <img src={post} className=" w-full md:h-72 h-48 object-cover" />
        {/* content */}
        <div className=" w-full h-fit flex md:flex-row flex-col gap-y-3 md:gap-y-0 px-5 py-3">
          {/* Profile Post */}
          <div className=" w-fit h-full md:block flex gap-x-3">
            <div className=" w-9 h-9 rounded-full overflow-hidden">
              <img src={user} alt="user" className=" w-full h-full object-cover" />
            </div>
            {/* when md hidden */}
            <div className="  flex-grow flex flex-col md:hidden ">
              <span className=" text-[15px] font-medium">Bintang Aldian</span>
              <span className="text-sm font-normal">Jun 9</span>
            </div>
          </div>
          <div className=" md:px-4 flex flex-col gap-y-3 w-full">
            {/* when small hidden */}
            <div className=" w-full md:flex flex-col hidden ">
              <span className=" text-[15px] font-medium">Bintang Aldian</span>
              <span className="text-sm font-normal">Jun 9</span>
            </div>
            {/* title post */}
            <h1 className=" md:text-3xl text-xl font-bold cursor-pointer hover:text-blue-600 transition-colors duration-200 ease-in-out">
              Lorem ipsum dolor sit amet consectetur.
            </h1>
            {/* Category */}
            <div className=" w-fit h-fit">
              <div className=" md:px-5 px-4 py-1 bg-gray-100 rounded-full cursor-pointer text-sm md:text-base">
                Game
              </div>
            </div>
            {/* Post Feature */}
            <div className=" w-full pt-2 flex items-center justify-between">
              {/* reaction And Comment */}
              <div className=" flex md:gap-x-4 gap-x-2 items-center">
                {/* reaction */}
                <div className=" flex gap-x-2 items-center hover:bg-slate-100 py-2 rounded-md cursor-pointer px-2 transition-all ease-in-out duration-200">
                  <button className=" w-5 h-5">
                    <BiLike className=" w-full h-full text-black" />
                  </button>
                  <span className=" text-sm text-gray-500">1</span>
                </div>
                <div className=" flex gap-x-2 items-center hover:bg-slate-100 py-2 rounded-md cursor-pointer px-2 transition-all ease-in-out duration-200">
                  <button className=" w-5 h-5">
                    <BiComment className=" w-full h-full text-black" />
                  </button>
                  <span className=" text-sm text-gray-500">1</span>
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
    </div>
  );
};

export default Home;
