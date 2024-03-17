"use client";
// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiArrowUpLine } from "react-icons/ri";
const Navbar = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchRef = React.useRef();
  const router = useRouter();
  const [scrollToTop, setScrollToTop] = useState(false);
  const handleScrollToTop = () => {
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };
    scrollToTop();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = searchRef.current.value.trim();
    if (!searchTerm) {
      alert("Silakan masukkan judul anime yang ingin Anda cari.");
      return;
    }
    router.push(`/search/${searchTerm}`);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/genres/anime`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        setGenres(data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <header className="mx-auto w-full items-center">
      {scrollToTop && (
        <div
          className="fixed bottom-4 right-4 text-5xl z-10 bg-blue-400 rounded-full cursor-pointer transition-opacity duration-300 hover:opacity-80"
          onClick={handleScrollToTop}
        >
          <RiArrowUpLine className="p-2 text-white" />
        </div>
      )}
      <nav className="p-3 bg-blue-400 flex lg:flex-row flex-col md:flex-row gap-1 justify-between items-center">
        <Link
          href={"/"}
          className="font-bold text-xl text-slate-100 tracking-wide"
        >
          -RenAnimeList.
        </Link>

        <form className="flex w-96" onSubmit={handleSearch}>
          <Link
            href={"/"}
            className="flex justify-center items-center p-1 w-20 text-xl rounded-s-md text-blue-500 bg-slate-200"
          >
            <FaHome />
          </Link>
          <input
            type="search"
            placeholder="Search Anime..."
            ref={searchRef}
            className="placeholder:text-blue-400 border border-blue-400  w-full  p-2 outline-none"
          />
          <button
            type="submit"
            className="p-3 bg-slate-100 rounded-e-md text-blue-600"
          >
            <CiSearch />
          </button>
        </form>
      </nav>
      <div className="genres py-2 flex items-center w-full bg-blue-400 border border-slate-300 gap-3  overflow-x-auto">
        {genres.map((genre) => (
          <Link
            href={`/genres/${genre.name}`}
            key={genre.mal_id}
            className="px-3 py-2 border  text-center"
          >
            <p className="text-sm lg:w-60 w-40 text-white">{genre.name}</p>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
