import React from "react";
import Link from "next/link";
import { MdOutlineContentPasteSearch } from "react-icons/md";
const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="items-center mx-auto ">
        <div className="text-center flex text-blue-500 gap-1">
          <MdOutlineContentPasteSearch className="text-2xl " />
          <h1 className="text-3xl font-bold">NOT FOUND :{"("}</h1>
        </div>
        <button className="text-center w-full bg-blue-500 hover:bg-blue-700 transition-colors duration-300 mt-3 text-white p-2 rounded-md">
          <Link href="/">KEMBALI </Link>
        </button>
      </div>
    </div>
  );
};

export default Page;
