import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BsTrash3Fill } from "react-icons/bs";
import { RiImageEditFill } from "react-icons/ri";

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
  const [previewCover, setPreviewCover] = useState(null);
  const [cover, setCover] = useState("");

  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(content));
  });

  useEffect(() => {
    localStorage.setItem("draft", JSON.stringify(value));
  }, [value]);

  const handleChange = (e) => {
    const { value, name, files } = e.target;
    if (name === "img") {
      const file = files[0];
      // const coverUrl = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const coverUrl = e.target.result;
        console.log(coverUrl);
        setPreviewCover(coverUrl);
        setValue((prev) => ({
          ...prev,
          [name]: coverUrl,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setValue((prev) => ({
        ...prev,
        [e.target.name]: value,
      }));
    }
  };

  // const getImageFromLocal = (e) => {
  //   console.log(e.target.files);
  //   const cover = e.target.files[0];
  //   setCover(cover);
  //   setPreviewCover(URL.createObjectURL(cover));
  // };

  const handleClick = () => {
    setContent("");
    setValue((prev) => ({ ...prev, img: "", heading: "" }));
    localStorage.removeItem("content");
  };

  const removeCover = () => {
    console.log("remove");
    setValue((prev) => ({ ...prev, img: "" }));
    // const draftData = JSON.parse(localStorage.getItem("draft")) || {};
    // draftData.img = "";
    // localStorage.setItem("draft", JSON.stringify(draftData));
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
            <div className=" w-full h-full p-7 overflow-y-auto flex flex-col gap-y-5 bg-white rounded-md shadow-[0_0_0.8px_0] shadow-gray-400 ">
              {value?.img !== "" ? (
                <div className=" w-full h-[600px] overflow-hidden">
                  <img src={value?.img} className=" w-full h-full object-cover" />
                </div>
              ) : null}
              <div className="flex flex-col gap-y-10 w-full h-full">
                <h1 className=" text-[46px] font-extrabold">{value.heading}</h1>
                <div className=" " dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          )}
          {/* Button publish and savedraft show when status edit or preview */}
          <div className=" w-full h-fit lg:py-3 bg-transparent flex gap-x-3">
            <button className=" px-3 py-2 bg-blue-700 rounded-md font-semibold text-white" onClick={handleClick}>
              Publish
            </button>
            <button className=" px-3 py-2 hover:bg-blue-100 rounded-md hover:text-blue-600">Save Draft</button>
          </div>
        </div>
        {/* add cover image and select category *show when status edit */}
        {display === "edit" ? (
          <div className=" lg:flex flex-col flex-grow h-full ">
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
              <div className=" w-full h-fit flex items-center justify-center gap-x-2">
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
                    <button className=" w-1/2 py-2 bg-red-600 font-medium text-white rounded-md flex items-center justify-center cursor-pointer gap-x-2">
                      <BsTrash3Fill
                        className=" w-4
                       h-4"
                        onClick={removeCover}
                      />
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CreatePost;
