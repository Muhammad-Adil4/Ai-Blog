"use client";
const NewsLetter = () => {
  return (
    <>
      <div className="text-center w-full py-30 px-4">
        <h1 className="text-3xl md:text-4xl font-semibold">Never Miss a Blog!</h1>
        <p className="text-base md:text-lg py-3">
          Subscribe to get the latest blog, new tech, and exclusive news.
        </p>

        <form className="border border-[#5044E5]/40 rounded max-w-md md:max-w-xl mt-4 mx-auto flex flex-col sm:flex-row items-center gap-2 p-2">
          <input
            type="text"
            className="flex-1 outline-none px-4 py-2 rounded sm:rounded-none sm:rounded-l-md text-sm sm:text-base w-full"
            placeholder="Enter your email id"
          />
          <button
            type="submit"
            className="bg-[#5044E5] px-5 py-2 text-sm sm:text-base rounded sm:rounded-none sm:rounded-r-md text-white w-full sm:w-auto cursor-pointer"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </>
  );
};

export default NewsLetter;
