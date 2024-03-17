const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 bg-blue-400">
      <div className="container mx-auto px-3 ">
        <div className="flex justify-between lg:flex-row md:flex-row flex-col items-center">
          <p className="text-white">
            &copy; {currentYear} -RenAnimeList. All rights reserved.
          </p>

          <div className="flex justify-end">
            <a href="#" className="text-white hover:text-gray-200 px-3">
              About
            </a>
            <a href="#" className="text-white hover:text-gray-200 px-3">
              Contact
            </a>
            <a href="#" className="text-white hover:text-gray-200 px-3">
              Privacy & Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
