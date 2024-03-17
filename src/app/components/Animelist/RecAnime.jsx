"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const RecAnime = () => {
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/1/recommendations`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const data = await response.json();
      setRecommendations(data.data.map((item) => item.entry)); // Ambil properti 'entry' dari setiap objek
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <section className="py-6 px-3 ">
      <div className="container mx-auto items-center">
        <div className="title flex  pb-3 text-xl font-bold ">
          <h1>Rekomendasi</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 items-center place-items-center gap-4">
          {recommendations.slice(0, 20).map((anime) => (
            <Link
              href={`/anime/${anime.mal_id}`}
              className="shadow-xl w-full h-full  hover:scale-95 duration-200 transition-transform ease-in"
              key={anime.mal_id}
            >
              <Image
                src={anime.images?.jpg.image_url}
                width={200}
                height={200}
                className="mx-auto w-full lg:h-80 md:h-80 h-60 object-cover rounded-md"
              />
              <div className="lg:text-lg md:text-md text-sm p-2">
                <h1 className="font-bold text-gray-800">{anime.title}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecAnime;
