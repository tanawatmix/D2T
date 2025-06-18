import React from "react";
import { useContext, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
// import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../ThemeContext";

import D2T2 from "./assets/dare2New.png";
import bp from "./assets/bp.jpg"; // Background image
import wp from "./assets/whiteWater.jpg"; // Background image
import { t } from "i18next";
// import { div, i } from "framer-motion/client";

const images = [
  "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/03/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-23T123322.980.png",
  "https://www.scb.co.th/content/media/personal-banking/stories-tips/traveling-thailand/traveling-thailand5.jpg",
  "https://content.skyscnr.com/m/101c2e3b26827c4d/original/GettyImages-472699356.jpg?resize=1800px:1800px&quality=100",
  "https://static.thairath.co.th/media/B6FtNKtgSqRqbnNsUjIbmiEcqGTAplE6rsu5LmPq0IP7vZS8ASy5qvnYYde7wSEWD1QkN.jpg",
  "https://tonkit360.com/wp-content/uploads/2021/10/%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B9%84%E0%B8%97%E0%B8%A21-1024x683.jpg",
  "https://www.chillpainai.com/src/wewakeup/scoop/images/1acefd76e1d13a2933acc46dbbe611b9a0cd3b65.jpg",
  "https://www.kkday.com/th/blog/wp-content/uploads/colton-duke-pit2V7NJ_e4-unsplash.jpg",
  "https://www.chillpainai.com/src/wewakeup/scoop/images/d8d6d962a509bce12dbf32dcf9fa5aac716eaa05.jpg",
  "https://f.ptcdn.info/769/044/000/ob1ahrm9zPblJUdIXnV-o.jpg",
];

const HomeUI = () => {
  const { darkMode } = useContext(ThemeContext);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Carousel state and animation setup
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);
  const SPRING_OPTIONS = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };

  const onDragEnd = (info) => {
    if (info.offset.x < -100 && imgIndex < images.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (info.offset.x > 100 && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Allow setImgIndex to accept both updater and direct value
  const setImgIndexSafe = (value) => {
    if (typeof value === "function") {
      setImgIndex(value);
    } else {
      setImgIndex(value);
    }
  };

  return (
    <div
      className={`relative min-h-screen transition duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      style={{
        backgroundImage: `radial-gradient(circle 300px at ${
          mousePosition.x
        }px ${mousePosition.y}px, ${
          darkMode ? "rgba(184, 70, 255, 0.5)" : "rgba(255, 144, 153, 0.5)"
        }, transparent 50%), url(${darkMode ? bp : wp})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <div className="relative">
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          {/* Title */}

          <img src={D2T2} alt="D2T" className="w-64 h-42 mt-16 " />
          <h1
            className={`font-sriracha text-6xl py-4 px-20 font-extrabold mb-4 text-center drop-shadow-lg transition duration-500 bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-anim ${
              darkMode
                ? "from-blue-500 via-purple-300 to-pink-400"
                : "from-pink-500 via-pink-400 to-orange-300"
            }`}
          >
            {t("welcome_message")}
          </h1>

          {/* Description */}
          <div
            className={`font-sriracha max-w-3xl backdrop-blur-sm rounded-xl shadow-xl bg-white/70 dark:bg-gray-900/70 p-3 mb-8 transition duration-500`}
          >
            <p className="text-xl font-bold text-center mb-4">
              {t("title")}
            </p>
            <p className=" text-base text-center mb-4">
              {t("title2")}
            </p>

            <div className="mx-auto h-20 w-full max-w-72 flex items-center justify-center">
              <button
                className="group flex h-12 w-56 items-center justify-center animate-gradient-anims gap-3 border-2 border-pink-500 dark:border-blue-400 bg-gradient-to-r from-pink-100 via-orange-100 to-white dark:from-blue-900 dark:via-purple-900 dark:to-gray-900 px-8 text-lg font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-200"
                style={{ transform: "translateX(0px) translateY(0px)" }}
                onClick={() => (window.location.href = "/Posts")}
              >
                <span className="relative overflow-hidden">
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                    {t("go_join")}
                  </span>
                  <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 text-10 group-hover:translate-y-0">
                    {t("Letsgo")}
                  </span>
                </span>
                <svg
                  className="w-5 h-5 ml-2 text-pink-500 dark:text-blue-400 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 20 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-7-7l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="relative w-full max-w-3xl flex items-center justify-center mt-8 mb-4">
            <button
              className="absolute hover:scale-150 left-0 top-1/2 -translate-y-1/2 z-20 bg-white/70 dark:bg-gray-800/70 hover:bg-white/90 dark:hover:bg-gray-700/90 text-black dark:text-white rounded-full p-3 shadow-lg transition"
              onClick={() =>
                setImgIndexSafe((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              aria-label="Scroll left"
            >
              🢀
            </button>
            <div className="overflow-hidden  rounded-xl w-full">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{ x: dragX }}
                animate={{ x: -imgIndex * 100 + "%" }}
                transition={SPRING_OPTIONS}
                onDragEnd={onDragEnd}
                className="flex "
              >
                {images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`carousel-img-${idx}`}
                    className="object-cover object-center mx-auto w-full h-80 flex-shrink-0"
                    style={{ minWidth: "100%" }}
                  />
                ))}
              </motion.div>
            </div>

            <button
              className="absolute hover:scale-150 right-0 top-1/2 -translate-y-1/2 z-20 bg-white/70 dark:bg-gray-800/70 hover:bg-white/90 dark:hover:bg-gray-700/90 text-black dark:text-white rounded-full p-3 shadow-lg transition"
              onClick={() =>
                setImgIndexSafe((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              aria-label="Scroll right"
            >
            🡺
            </button>
          </div>
                <div className="flex bg-primary rounded-full  justify-center">
                {images.map((_, idx) => (
                  <button
                  key={idx}
                  onClick={() => setImgIndexSafe(idx)}
                  className={`h-3 w-6 hover:scale-150 rounded-full hover:border-2 border-white-500 transition-all duration-100 ${
                    idx === imgIndex
                    ? darkMode
                      ? "bg-secondary scale-150 shadow-lg"
                      : "bg-pink-500 scale-150 shadow-lg"
                    : "bg-primary hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
                </div>


                
          <div
            className={`max-w-4xl backdrop-blur-sm rounded-xl shadow-xl bg-white/70 dark:bg-gray-900/70 p-4 mt-16 mb-20 transition duration-500`}
          >
          
            <h2
              className={`font-sriracha text-2xl font-bold mb-4 text-center bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 bg-clip-text text-transparent ${
                darkMode
                  ? "from-blue-500 via-purple-300 to-pink-400"
                  : "from-pink-500 via-pink-400 to-orange-300"
              }`}
            >
              {t("title3")}
            </h2>
            <p className="font-sriracha text-base text-center">
              {t("title4")}
            </p>
           <div className="max-w-3xl mx-auto my-8 relative aspect-video rounded-xl overflow-hidden shadow-lg">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Y2KLfYr-UiQ?autoplay=1&mute=1"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
</div>
              <p className="font-sriracha text-base text-center">
                🔺🔺🔺🔺----------------------------------🔺🔺🔺🔺
              </p>

          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeUI;   