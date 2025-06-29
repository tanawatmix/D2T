import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../ThemeContext";
import { useSearchParams } from "react-router-dom";
import bp from "./assets/bp.jpg"; // Background image
import wp from "./assets/whiteWater.jpg"; // Background image

import mockPosts from "../mock/mockPost";

import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import PostCard from "./components/PostCard";

import { FaPlus, FaSearch } from "react-icons/fa";
import Drawer from "@mui/material/Drawer";
import { useTranslation } from "react-i18next";

const PostPage = () => {
  const { t } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [searchName, setSearchName] = useState("");
  const posts = mockPosts;
  const [filteredPosts, setFilteredPosts] = useState(posts);
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  const postsPerPage = 12;
  useEffect(() => {
    setFilteredPosts(posts);
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const toggleDrawer = (open) => () => setIsDrawerOpen(open);

  const placeTypes = ["ร้านอาหาร", "สถานที่ท่องเที่ยว", "โรงแรม"];
  const provinces = [
    "กรุงเทพมหานคร",
    "กระบี่",
    "กาญจนบุรี",
    "กาฬสินธุ์",
    "กำแพงเพชร",
    "ขอนแก่น",
    "จันทบุรี",
    "ฉะเชิงเทรา",
    "ชลบุรี",
    "ชัยนาท",
    "ชัยภูมิ",
    "ชุมพร",
    "เชียงราย",
    "เชียงใหม่",
    "ตรัง",
    "ตราด",
    "ตาก",
    "นครนายก",
    "นครปฐม",
    "นครพนม",
    "นครราชสีมา",
    "นครศรีธรรมราช",
    "นครสวรรค์",
    "นนทบุรี",
    "นราธิวาส",
    "น่าน",
    "บึงกาฬ",
    "บุรีรัมย์",
    "ปทุมธานี",
    "ประจวบคีรีขันธ์",
    "ปราจีนบุรี",
    "ปัตตานี",
    "พระนครศรีอยุธยา",
    "พะเยา",
    "พังงา",
    "พัทลุง",
    "พิจิตร",
    "พิษณุโลก",
    "เพชรบุรี",
    "เพชรบูรณ์",
    "แพร่",
    "ภูเก็ต",
    "มหาสารคาม",
    "มุกดาหาร",
    "แม่ฮ่องสอน",
    "ยโสธร",
    "ยะลา",
    "ร้อยเอ็ด",
    "ระนอง",
    "ระยอง",
    "ราชบุรี",
    "ลพบุรี",
    "ลำปาง",
    "ลำพูน",
    "เลย",
    "ศรีสะเกษ",
    "สกลนคร",
    "สงขลา",
    "สตูล",
    "สมุทรปราการ",
    "สมุทรสงคราม",
    "สมุทรสาคร",
    "สระแก้ว",
    "สระบุรี",
    "สิงห์บุรี",
    "สุโขทัย",
    "สุพรรณบุรี",
    "สุราษฎร์ธานี",
    "สุรินทร์",
    "หนองคาย",
    "หนองบัวลำภู",
    "อ่างทอง",
    "อำนาจเจริญ",
    "อุดรธานี",
    "อุตรดิตถ์",
    "อุทัยธานี",
    "อุบลราชธานี",
  ];

  const { darkMode } = useContext(ThemeContext);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSearch = () => {
    const filtered = posts.filter((post) => {
      const matchName =
        searchName.trim() === "" ||
        (post.title || "").toLowerCase().includes(searchName.toLowerCase());

      const matchType = selectedType === "" || post.type === selectedType;
      const matchProvince =
        selectedProvince === "" || post.province === selectedProvince;

      return matchName && matchType && matchProvince;
    });

    setFilteredPosts(filtered);
    setCurrentPage(1);
    toggleDrawer(false)(); // ปิด Drawer หลังค้นหา
  };

  const handlePageChange = (page) => {
    setSearchParams({ page: String(page) });
  };

  return (
    <div
      className={`font-sriracha min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className="relative bg-fixed bg-center bg-cover transition duration-500 flex-1"
        style={{
          backgroundImage: `url(${darkMode ? bp : wp})`,
        }}
      >
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <button
              onClick={() => (window.location.href = "/create-post")}
              className="flex items-center gap-2 border-2 border-blue-400 dark:border-pink-500 rounded-lg bg-primary text-black dark:bg-secondary dark:text-primary px-6 py-2 font-semibold shadow hover:bg-secondary hover:text-white dark:hover:bg-primary dark:hover:text-secondary transition-all duration-300"
            >
              <FaPlus />
              <p>{t("post")}</p>
            </button>
            <button
              onClick={toggleDrawer(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-white dark:bg-primary dark:text-secondary hover:bg-pink-400 dark:hover:bg-pink-400 transition-all duration-300 shadow"
            >
              <FaSearch className="text-xl" />
              <span className="hidden md:inline">{t("search")}</span>
            </button>
          </div>

          {/* Drawer */}
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <div className="font-sriracha w-[320px] p-6 space-y-6 bg-primary dark:bg-secondary h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-secondary dark:text-primary mb-4">
                {t("search")}
              </h2>

              {/* ชื่อสถานที่ */}
              <div>
                <label className="block mb-1 text-sm font-medium text-secondary dark:text-primary">
                  {t("PlaceName")}
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                      toggleDrawer(false)();
                    }
                  }}
                  placeholder="เช่น วัดพระแก้ว"
                />
              </div>

              {/* ประเภท */}
              <div>
                <label className="block mb-1 text-sm font-medium text-secondary dark:text-primary">
                  {t("Placetag")}
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">ทั้งหมด</option>
                  {placeTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* จังหวัด */}
              <div>
                <label className="block mb-1 text-sm font-medium text-secondary dark:text-primary">
                  {t("Provincetag")}
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                >
                  <option value="">ทั้งหมด</option>
                  {provinces.map((province, i) => (
                    <option key={i} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              {/* ปุ่มค้นหา */}
              <button
                onClick={handleSearch}
                className="w-full bg-pink-400 hover:bg-secondary dark:hover:bg-primary hover:dark:text-secondary text-white font-semibold text-xl py-2 rounded shadow transition-all duration-300"
              >
                {t("search")}
              </button>

              {/* ปุ่มล้างตัวกรอง */}
              <button
                onClick={() => {
                  setSearchName("");
                  setSelectedType("");
                  setSelectedProvince("");
                  setCurrentPage(1);
                  setFilteredPosts(posts); // Reset โพสต์กลับทั้งหมด
                  toggleDrawer(false)(); // ปิด Drawer ด้วย
                }}
                className="text-sm underline text-pink-400 dark:hover:text-primary hover:text-secondary"
              >
                ล้างตัวกรอง
              </button>
            </div>
          </Drawer>

          {/* Posts */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
            {currentPosts.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-xl">
                ไม่พบโพสต์ที่ตรงกับตัวกรอง
              </div>
            ) : (
              currentPosts.map((post, idx) => (
                <PostCard
                  key={idx}
                  images={post.images}
                  title={post.title}
                  type={post.type}
                  province={post.province}
                  postId={idx}
                  description={post.description}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {currentPage > 1 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-2 py-1 rounded border border-blue-400 dark:border-pink-400"
                >
                  {"<<"}
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-2 py-1 rounded border border-blue-400 dark:border-pink-400"
                >
                  {"<"}
                </button>
              </>
            )}

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const startPage = Math.max(
                1,
                Math.min(currentPage - 2, totalPages - 4)
              );
              const pageNumber = i + startPage;
              if (pageNumber > totalPages) return null;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 rounded border dark:border-pink-400 border-blue-400 hover:bg-blue-400 dark:hover:bg-pink-400 ${
                    currentPage === pageNumber
                      ? "bg-blue-400 dark:bg-pink-400 text-white dark:text-secondary"
                      : "bg-pink dark:bg-secondary"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {currentPage < totalPages && (
              <>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-2 py-1 rounded border border-blue-400 dark:border-pink-400"
                >
                  {">"}
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-2 py-1 rounded border border-blue-400 dark:border-pink-400"
                >
                  {">>"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostPage;
