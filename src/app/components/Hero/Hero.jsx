import Jujutsu from "@/app/image/Jujutsu.jpg";
import Image from "next/image";
const Hero = () => {
  return (
    <section className="relative">
      <div className="banner text-white text-2xl font-bold text-center ">
        <Image
          src={Jujutsu}
          width={300}
          height={300}
          className="w-full h-80 lg:h-96 -z-50  object-cover  "
        />
      </div>
    </section>
  );
};

export default Hero;
