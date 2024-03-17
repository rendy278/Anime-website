import PopulerAnime from "./components/Animelist/PopulerAnime";
import Link from "next/link";
import RecAnime from "./components/Animelist/RecAnime";
import Hero from "./components/Hero/Hero";

const Home = () => {
  return (
    <main>
      <Hero />
      <PopulerAnime
        title={
          <>
            <h1>Paling Populer</h1>{" "}
            <Link
              href={`/allanime`}
              className="cursor-pointer text-blue-400 active:scale-95 z-50 underline"
            >
              Lihat semua
            </Link>
          </>
        }
        className="pt-3 pb-4  px-3"
      />
      <RecAnime />
    </main>
  );
};

export default Home;
