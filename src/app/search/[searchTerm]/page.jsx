"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const page = ({ params }) => {
  const { searchTerm } = params;
  const [searchData, setSearchData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${decodeURIComponent(
            searchTerm
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSearchData(data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (searchData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-500 font-bold">
          Maaf, data anime yang Anda cari tidak ada
        </h1>
      </div>
    );
  }

  return (
    <div className="py-3 mx-auto px-3">
      <div className="container mx-auto items-center">
        <div className="title flex justify-between pb-3 text-xl font-bold">
          <h1>Pencarian untuk {decodeURIComponent(searchTerm)} ...</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 items-center place-items-center gap-4">
          {searchData.map((anime) => (
            <Link
              href={`/anime/${anime.mal_id}`}
              className="shadow-xl w-full h-full relative hover:scale-95 duration-200 transition-transform ease-in"
              key={anime.mal_id}
            >
              <Image
                src={anime.images.webp.image_url}
                width={200}
                height={200}
                className="mx-auto w-full lg:h-80 md:h-80 h-60 object-cover rounded-md"
              />
              <div className="lg:text-lg md:text-md text-sm p-2">
                <p className="font-bold text-blue-700">{anime.year}</p>
                <p className="font-bold text-blue-500">
                  {anime.genres.map((genre) => genre.name).join(", ")}
                </p>
                <h1 className="font-bold text-gray-800">{anime.title}</h1>
              </div>
              <h1 className="p-2 text-xs lg:text-lg md:text-lg absolute rounded-sm font-semibold top-0 bg-blue-400 text-white">
                {anime.type}
              </h1>
              <p className="absolute p-2 text-xs lg:text-md md:text-lg bg-blue-400 text-white top-0 right-0 font-semibold rounded-sm">
                Episode: {anime.episodes}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
