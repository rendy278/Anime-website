import Jujutsu from "@/app/image/Jujutsu.jpg";
import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <section className="relative">
      <Link
        href={`/anime/40748`}
        className="absolute cursor-pointer banner inset-0 w-full h-96 text-white text-center font-bold text-2xl"
      ></Link>
      <div className="relative h-96">
        <Image
          src={Jujutsu}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
    </section>
  );
};

export default Hero;
