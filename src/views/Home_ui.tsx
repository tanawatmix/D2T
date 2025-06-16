import { useContext, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
// import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../ThemeContext";

import D2T2 from "./assets/D2win.png"; // Logo image
import bp from "./assets/fire1.jpg"; // Background image
import wp from "./assets/whiteWater.jpg"; // Background image
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
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  };

  const onDragEnd = (info: any) => {
    if (info.offset.x < -100 && imgIndex < images.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (info.offset.x > 100 && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Allow setImgIndex to accept both updater and direct value
  const setImgIndexSafe = (value: number | ((prev: number) => number)) => {
    if (typeof value === "function") {
      setImgIndex(value as (prev: number) => number);
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

          <img src={D2T2} alt="D2T" className="w-32 h-32 mt-32 " />
          <h1
            className={`text-3xl font-extrabold mb-4 text-center drop-shadow-lg transition duration-500 bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-anim ${
              darkMode
                ? "from-blue-500 via-purple-300 to-pink-400"
                : "from-pink-500 via-pink-400 to-orange-300"
            }`}
          >
            เมืองหลวงที่เต็มไปด้วยความทันสมัยและวัฒนธรรมดั้งเดิม
          </h1>

          {/* Description */}
          <div
            className={`max-w-3xl backdrop-blur-sm rounded-xl shadow-xl bg-white/70 dark:bg-gray-900/70 p-8 mt-4 mb-8 transition duration-500`}
          >
            <p className="text-xl font-bold text-center mb-4">
              Dare2Thai
              เป็นแพลตฟอร์มที่เชื่อมโยงผู้คนที่รักการท่องเที่ยวและการสำรวจสถานที่ใหม่
              ๆ ในประเทศไทย
            </p>
            <p className="text-base text-center mb-4">
              เราเชื่อว่าการเดินทางไม่ใช่แค่การเปลี่ยนสถานที่
              แต่คือการเปิดมุมมองใหม่ ๆ ให้กับชีวิต
              ไม่ว่าคุณจะเป็นนักเดินทางสายลุย นักถ่ายภาพธรรมชาติ
              หรือผู้ที่หลงใหลในวัฒนธรรมท้องถิ่น ที่นี่คือพื้นที่สำหรับคุณ
              สำรวจเส้นทางลับ หมู่บ้านเล็ก ๆ ที่ยังไม่ถูกรุกล้ำด้วยนักท่องเที่ยว
              และสัมผัสวิถีชีวิตที่แท้จริงของผู้คน ค้นพบจุดหมายใหม่ ๆ
              ที่คุณอาจไม่เคยรู้ว่ามีอยู่บนแผนที่ของไทย
            </p>

            <div className="mx-auto h-20 w-full max-w-72 flex items-center justify-center">
              <button
                className="group flex h-12 w-56 items-center justify-center animate-gradient-anims gap-3 border-2 border-pink-500 dark:border-blue-400 bg-gradient-to-r from-pink-100 via-orange-100 to-white dark:from-blue-900 dark:via-purple-900 dark:to-gray-900 px-8 text-lg font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-200"
                style={{ transform: "translateX(0px) translateY(0px)" }}
                onClick={() => (window.location.href = "/Posts")}
              >
                <span className="relative overflow-hidden">
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                    เริ่มต้นสำรวจ
                  </span>
                  <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 text-10 group-hover:translate-y-0">
                    ไปกันเลย~~
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
                setImgIndexSafe((prev: number) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              aria-label="Scroll left"
            >
              ◀=
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
                setImgIndexSafe((prev: number) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              aria-label="Scroll right"
            >
              =▶
            </button>
          </div>
          {/* Carousel Dots */}
          <div className=" flex bg-primary rounded-full justify-center">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setImgIndexSafe(idx)}
                className={`h-3 w-6 hover:scale-150 rounded-full transition-colors ${
                  idx === imgIndex
                    ? darkMode
                      ? "bg-secondary"
                      : "bg-pink-500"
                    : "bg-primary hover:bg-gray-500 transition duration-200"
                }`}
              />
            ))}
          </div>

          {/* Thailand Summary */}
          <div
            className={`max-w-4xl backdrop-blur-sm rounded-xl shadow-xl bg-white/70 dark:bg-gray-900/70 p-8 mt-16 mb-20 transition duration-500`}
          >
            <h2
              className={`text-2xl font-bold mb-4 text-center bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 bg-clip-text text-transparent ${
                darkMode
                  ? "from-blue-500 via-purple-300 to-pink-400"
                  : "from-pink-500 via-pink-400 to-orange-300"
              }`}
            >
              สัมผัสเสน่ห์แบบประเทศไทย
            </h2>
            <p className="text-base text-center">
              ประเทศไทยถือเป็นหนึ่งในจุดหมายปลายทางยอดนิยมของนักท่องเที่ยวทั่วโลก
              ด้วยความหลากหลายทางวัฒนธรรม ธรรมชาติที่งดงาม
              และอาหารที่มีรสชาติอร่อยเลิศ
              ที่นี่คุณจะได้สัมผัสกับบรรยากาศที่อบอุ่นและเป็นมิตรจากคนไทยที่มีน้ำใจ
              หากคุณชื่นชอบทะเล ชายหาดที่สวยงามของภูเก็ต กระบี่
              และเกาะสมุยจะไม่ทำให้คุณผิดหวัง น้ำทะเลใสสีฟ้าคราม ทรายขาวละเอียด
              เหมาะแก่การพักผ่อนและทำกิจกรรมทางน้ำ
              สำหรับคนรักธรรมชาติและการผจญภัย
              เชียงใหม่และเชียงรายในภาคเหนือจะพาคุณไปพบกับขุนเขาสูง
              ป่าไม้เขียวขจี และวัฒนธรรมชนเผ่าที่น่าสนใจ
              อย่าพลาดการเยี่ยมชมวัดโบราณและตลาดกลางคืนที่เต็มไปด้วยของฝากพื้นเมือง
              ในกรุงเทพฯ เมืองหลวงที่เต็มไปด้วยความทันสมัยและวัฒนธรรมดั้งเดิม
              คุณจะได้ชมวัดพระแก้ว พระบรมมหาราชวัง และตลาดน้ำที่มีสีสัน
              รวมทั้งสถานที่ช้อปปิ้งและร้านอาหารหลากหลาย นอกจากนี้
              อย่าลืมลิ้มลองอาหารไทยที่ขึ้นชื่อ เช่น ต้มยำกุ้ง ผัดไทย
              แกงเขียวหวาน และส้มตำ ที่มีรสชาติจัดจ้านและสมดุลระหว่างเปรี้ยว
              หวาน เผ็ด และเค็ม ประเทศไทยมีเทศกาลและประเพณีที่น่าสนใจตลอดทั้งปี
              เช่น สงกรานต์ ลอยกระทง และงานวัฒนธรรมท้องถิ่น
              ที่จะทำให้คุณได้สัมผัสวิถีชีวิตและความเชื่อของคนไทยอย่างแท้จริง
              ไม่ว่าคุณจะมาเพื่อพักผ่อน ช้อปปิ้ง หรือเรียนรู้วัฒนธรรม
              ไทยก็มีทุกอย่างให้ครบครัน
              พร้อมบริการที่อบอุ่นและเป็นกันเองที่คุณจะประทับใจไม่รู้ลืม
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeUI;
