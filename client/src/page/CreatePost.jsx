import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";

// const schema = yup.object().shape({
//   postContent: yup.string().required(),
//   heading: yup.string().required().min(15),
// });

const getDraftData = () => {
  const storedValues = localStorage.getItem("draft");
  if (!storedValues)
    return {
      heading: "",
      img: "",
      category: "",
    };
  return JSON.parse(storedValues);
};

const CreatePost = () => {
  const [display, setDisplay] = useState("edit");
  const [value, setValue] = useState(getDraftData);
  const [content, setContent] = useState(JSON.parse(localStorage.getItem("content")) || "");

  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(content));
  });

  useEffect(() => {
    localStorage.setItem("draft", JSON.stringify(value));
  }, [value]);

  const handleChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    localStorage.removeItem("content");
    localStorage.removeItem("draft");
  };

  return (
    <div className=" w-full px-28 h-[calc(100vh-80px)] flex">
      <div className=" w-[70%] h-full flex flex-col gap-y-2">
        <div className=" w-full flex justify-between items-center">
          <h1 className=" text-xl font-semibold">Create Post</h1>
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
        {display === "edit" ? (
          <form className=" w-full h-full bg-white rounded-md shadow-[0_0_0.8px_0] shadow-gray-400 flex flex-col gap-y-6">
            <div className=" w-full h-fit px-8">
              <input
                className=" w-full h-fit outline-none text-[45px] font-extrabold flex flex-wrap max-w-full placeholder:text-gray-600"
                placeholder="New Post Hear"
                type="text"
                onChange={handleChange}
                name="heading"
                value={value.heading}
              />
              {/* <input
                className=" w-full h-fit outline-none text-[45px] font-extrabold flex flex-wrap max-w-full placeholder:text-gray-600"
                placeholder="New Post Hear"
                type="file"
                onChange={handleChange}
                name="heading"
                value={value.heading}
              /> */}
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
          <div className=" w-full h-full p-7 overflow-y-auto flex flex-col gap-y-10 bg-white rounded-md shadow-[0_0_0.8px_0] shadow-gray-400">
            <h1 className=" text-[46px] font-extrabold">{value.heading}</h1>
            <div className=" " dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
        <div className=" w-full h-fit lg:py-3 bg-transparent flex gap-x-3">
          <button className=" px-3 py-2 bg-blue-700 rounded-md font-semibold text-white" onClick={handleClick}>
            Publish
          </button>
          <button className=" px-3 py-2 hover:bg-blue-100 rounded-md hover:text-blue-600">Save Draft</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
