"use client";
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";

const Page = ({ params: { id } }) => {
  const [animeData, setAnimeData] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch anime data");
        }
        const data = await response.json();
        setAnimeData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const fetchCharactersData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/${id}/characters`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch characters data");
        }
        const data = await response.json();
        setCharacters(data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const fetchEpisodesData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/${id}/episodes`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch episodes data");
        }
        const data = await response.json();
        setEpisodes(data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAnimeData();
    fetchCharactersData();
    fetchEpisodesData();
  }, [id]);

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

  return (
    <section className="py-3 mx-auto px-3">
      <div className="container mx-auto items-center">
        {animeData && animeData.data && (
          <YouTube
            videoId={animeData.data.trailer.youtube_id}
            className="flex justify-center h-[300px] lg:h-[500px] md:h-[450px]"
            opts={{ width: "100%", height: "auto" }}
          />
        )}
        <div className="grid lg:grid-cols-3 grid-cols-1 mt-3 place-items-center gap-y-3 mx-auto w-full">
          {animeData && animeData.data && (
            <div className="flex flex-col justify-center gap-y-4 mx-auto items-center relative">
              <Image
                src={animeData.data.images.webp.image_url}
                width={400}
                height={400}
                className="object-cover w-96 mx-auto rounded-md"
              />
              <h1 className="p-3 text-xl lg:text-lg md:text-lg absolute rounded-md font-semibold top-0 left-0.5  bg-blue-400 text-white">
                {animeData.data.type}
              </h1>
              <div className="flex gap-3 justify-center mx-auto text-base md:text-xl font-bold lg:text-lg">
                <article className="p-2 text-white bg-blue-500 rounded-md">
                  <h1>Score: {animeData.data.score}</h1>
                </article>
                <article className="p-2 text-white bg-blue-500 rounded-md">
                  <h1>Rank: {animeData.data.rank}</h1>
                </article>
                <article className="p-2 text-white bg-blue-500 rounded-md">
                  <h1>Popularity: {animeData.data.popularity}</h1>
                </article>
              </div>
            </div>
          )}
          <div className="mx-auto flex flex-col gap-2 col-span-2 ">
            {animeData && animeData.data && (
              <>
                <h1>
                  <span className="font-bold">Studio: </span>
                  {animeData.data.studios
                    .map((studio) => studio.name)
                    .join(", ")}
                </h1>
                <h1 className="text-2xl font-bold">{animeData.data.title}</h1>
                <h1 className="font-semibold text-xl">
                  Genre:{" "}
                  {animeData.data.genres.map((genre) => genre.name).join(", ")}
                </h1>
                <h1>Release: {animeData.data.year}</h1>
                <h1 className="font-bold">{animeData.data.status}</h1>
                <div className="flex items-center text-center gap-2 text-base lg:text-xl md:text-lg font-semibold">
                  <h2 className="p-2 text-white bg-blue-500 rounded-md">
                    Episode: {animeData.data.episodes}{" "}
                  </h2>
                  <h2 className="p-2 text-white bg-blue-500 rounded-md">
                    Duration: {animeData.data.duration}{" "}
                  </h2>
                  <h2 className="p-2 text-white bg-blue-500 rounded-md">
                    Source: {animeData.data.source}
                  </h2>
                </div>
                <p className="text-lg">
                  <span className="font-bold">Synopsis: </span>
                  {animeData.data.synopsis}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Background: </span>
                  {animeData.data.background}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mx-auto mt-8">
          <h1 className="font-bold text-2xl">Characters:</h1>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Autoplay]}
            className="mySwiper "
          >
            {characters.map((character) => (
              <SwiperSlide
                className="flex flex-col shadow-xl mt-3 w-full rounded-md h-60 lg:h-full md:h-80 items-center justify-center text-center "
                key={character.character.mal_id}
              >
                <Image
                  src={character.character.images.webp.image_url}
                  width={200}
                  height={200}
                  className="rounded-md mx-auto object-cover flex lg:h-96 md:h-72 sm:h-60 w-full h-60"
                />

                <div className="flex flex-col py-3">
                  <h1 className="font-bold">{character.character.name}</h1>
                  <h1>{character.role}</h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mx-auto mt-8">
          <h1 className="font-bold text-2xl">Episodes:</h1>
          <div className="flex-col flex  mt-4 h-[40rem] overflow-y-auto">
            {episodes.map((episode) => (
              <div
                key={episode.episode_id}
                className="border p-4 rounded-lg shadow-md"
              >
                <h2 className="font-semibold text-sm">
                  {episode.mal_id}. {episode.title}
                </h2>
                <div className="flex justify-between">
                  <p className="text-gray-600">Episode: {episode.mal_id}</p>
                  <p className="text-gray-600">
                    Aired: {episode.aired.slice(0, 10)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Kembali
        </button>
      </div>
    </section>
  );
};

export default Page;
