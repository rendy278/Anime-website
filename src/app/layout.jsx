import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ren AnimeList",
  description: "AnimeList",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
