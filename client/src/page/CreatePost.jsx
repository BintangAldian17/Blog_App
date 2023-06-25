import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BsTrash3Fill } from "react-icons/bs";
import { RiImageEditFill } from "react-icons/ri";
import Category from "../static/category.json";
import uploadCloudnary from "../../utils/upload";
import { useCreatePost } from "../hooks/post/useMutationPost";
import PulseLoader from "react-spinners/PulseLoader";
import { useQueryClient } from "@tanstack/react-query";
import { Prose } from "../components/Prose";

const getDraftData = () => {
  const storedValues = localStorage.getItem("draft");
  if (!storedValues)
    return {
      heading: "",
      img: "",
      category_name: "",
    };
  return JSON.parse(storedValues);
};

const CreatePost = () => {
  const [display, setDisplay] = useState("edit");
  const [value, setValue] = useState(getDraftData);
  const [content, setContent] = useState(JSON.parse(localStorage.getItem("content")) || "");
  const [openDropDown, setOpenDropDown] = useState(false);
  const [isError, setIsError] = useState(null);

  // save content(react quill)to localStorage
  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(content));
  }, [content]);

  // save cover,heading,category to localStorage
  useEffect(() => {
    localStorage.setItem("draft", JSON.stringify(value));
  }, [value]);

  const queryClient = useQueryClient();

  // useMutation cratePost
  const { isLoading, mutate, error } = useCreatePost({
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      setValue({ heading: "", img: "", category_name: "" });
      setContent("");
    },
  });

  // input cover,heading
  const handleChange = (e) => {
    const { value, name, files } = e.target;
    if (name === "img") {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const coverUrl = e.target.result;
        setValue((prev) => ({
          ...prev,
          [name]: coverUrl,
          fileName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePublishPost = async () => {
    try {
      const response = await fetch(value.img);
      const blob = await response.blob();
      const file = new File([blob], value.fileName);
      const url = await uploadCloudnary(file);
      if (url.error) {
        setIsError(url.error.message);
      } else {
        mutate({
          cover: url,
          heading: value.heading,
          content: content,
          category_name: value.category_name.toLowerCase(),
        });
        setIsError(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCover = () => {
    setValue((prev) => ({ ...prev, img: "", file: "" }));
  };

  const handleSetCategory = (category_name) => {
    setValue((prev) => ({ ...prev, category_name }));
    setOpenDropDown(!openDropDown);
  };

  return (
    <div className=" w-full px-28 h-[calc(100vh-80px)] flex flex-col">
      <div className=" flex justify-between items-center w-[70%]">
        <h1 className=" text-xl font-semibold">Create Post</h1>
        {/* Button status {edit and preview} */}
        <div className=" flex h-full w-fit gap-x-1">
          <button
            className={`${
              display === "edit" ? "font-semibold" : ""
            } px-3 lg:h-10 hover:bg-blue-100 hover:text-blue-600 rounded-md`}
            onClick={() => setDisplay("edit")}>
            Edit
          </button>
          <button
            className={`${
              display === "preview" ? "font-semibold" : ""
            } px-3 lg:h-10 hover:bg-blue-100 hover:text-blue-600 rounded-md`}
            onClick={() => setDisplay("preview")}>
            Preview
          </button>
        </div>
      </div>
      {/* Error Create Post */}
      {error || isError !== null ? (
        <div className=" w-[70%] px-2 py-3 bg-red-200 text-red-600 rounded-t-md">
          <h1>{error?.response?.data || isError} </h1>
        </div>
      ) : null}

      {/* form create post {react quill and input heading} *show when status edit */}
      <div className=" w-full h-full flex gap-x-3">
        <div className=" w-[70%] h-full flex flex-col gap-y-2">
          {display === "edit" ? (
            <form className=" w-full h-full bg-white rounded-md shadow-[0_0_0.8px_0] shadow-gray-400 flex flex-col gap-y-6">
              <div className=" w-full h-fit px-8 pt-2">
                <input
                  className=" w-full h-fit outline-none text-[45px] font-extrabold flex flex-wrap max-w-full placeholder:text-gray-600"
                  placeholder="New Post Hear"
                  type="text"
                  onChange={handleChange}
                  name="heading"
                  value={value.heading || ""}
                />
              </div>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={(newValue) => setContent(newValue)}
                className=" w-full h-full max-h-full flex flex-col"
                placeholder="Write Your Post Content Heare"
              />
            </form>
          ) : (
            // show when status preview
            <div className=" w-full h-full max-h-full p-7 overflow-y-auto flex flex-col gap-y-5 bg-white rounded-md shadow-[0_0_0.8px_0] shadow-gray-400 ">
              {value?.img !== "" ? (
                <div className=" w-full lg:h-[250px] overflow-hidden">
                  <img src={value?.img} className=" w-full h-full object-cover" />
                </div>
              ) : null}
              <div className="flex flex-col gap-y-10 w-full h-10">
                <h1 className=" text-[46px] font-extrabold">{value.heading}</h1>
                <Prose content={content} />
              </div>
            </div>
          )}
          {/* Button publish and savedraft show when status edit or preview */}
          <div className=" w-full h-fit lg:py-3 bg-transparent flex gap-x-3">
            <button
              className=" w-20 h-10 bg-blue-700 rounded-md font-semibold text-white hover:bg-blue-600 transition-all ease-in-out duration-200"
              onClick={handlePublishPost}
              disabled={isLoading}>
              {isLoading ? <PulseLoader size={8} color="#fff" /> : "Publish"}
            </button>
            <button className=" w-24 h-10 hover:bg-blue-100 rounded-md hover:text-blue-600 transition-all duration-200 ease-in-out">
              Save Draft
            </button>
          </div>
        </div>
        {/* add cover image and select category *show when status edit */}
        {display === "edit" ? (
          <div className=" lg:flex flex-col flex-grow h-full gap-y-3">
            <div className=" w-full h-fit bg-white rounded-md shadow-[0_0_0.8px_0] shadow-gray-400 flex flex-col gap-y-2 px-3 py-2">
              {/* preview coverimg */}
              {value.img !== "" ? (
                <div className=" w-full h-40 overflow-hidden">
                  <img src={value?.img} className=" w-full h-full object-cover" />
                </div>
              ) : (
                <div className=" w-full h-40 border border-dashed border-black overflow-hidden"></div>
              )}

              {/* add cover image button */}
              <div className=" flex-grow max-w-full h-fit flex items-center justify-center gap-x-2">
                {value.img === "" ? (
                  <label className=" w-[50%] py-2 border bg-blue-600 font-medium text-white rounded-md flex items-center justify-center cursor-pointer">
                    <span className="">Add Cover</span>
                    <input type="file" className=" hidden" name="img" onChange={handleChange} />
                  </label>
                ) : (
                  <>
                    <label className=" w-[50%] py-2 border bg-blue-600 font-medium text-white rounded-md flex items-center justify-center cursor-pointer gap-x-2">
                      <RiImageEditFill className=" w-5 h-5" />
                      <span className="">Edit</span>
                      <input type="file" className=" hidden" name="img" onChange={handleChange} />
                    </label>
                    <button
                      className=" w-1/2 py-2 bg-red-600 font-medium text-white rounded-md flex items-center justify-center cursor-pointer gap-x-2"
                      onClick={removeCover}>
                      <BsTrash3Fill
                        className=" w-4
                       h-4"
                      />
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* pick Category */}
            <div className=" w-full h-fit flex-col flex gap-y-2">
              <button
                className={` ${
                  openDropDown === true ? "border-blue-600 border-2" : ""
                } px-5 text-lg w-full h-12 bg-white rounded-md shadow-[0_0_0.8px_0] shadow-gray-400 font-semibold flex items-center justify-between`}
                onClick={() => setOpenDropDown(!openDropDown)}>
                {value.category_name === "" ? "Category" : value.category_name}
                <IoMdArrowDropdown />
              </button>
              {openDropDown && (
                <div className=" w-full flex flex-col bg-white rounded-md shadow-[0_0_0.8px_0] shadow-gray-400">
                  {Category.dataCategory.map((e) => {
                    return (
                      <button
                        key={e.id}
                        className=" w-full h-10 flex rounded-md hover:bg-blue-100 text-base font-medium items-center px-3"
                        onClick={() => handleSetCategory(e.desc)}>
                        {e.desc}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CreatePost;
