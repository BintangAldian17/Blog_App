export const Prose = ({ content }) => {
  return (
    <article className="prose prose-h1:text-black prose-ol:list-disc prose-ul:list-disc prose-ol:marker:text-black">
      <div className=" text-[18px] text-gray-800 " dangerouslySetInnerHTML={{ __html: content }}></div>
    </article>
  );
};
