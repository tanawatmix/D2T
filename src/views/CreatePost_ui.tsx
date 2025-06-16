import { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import React from "react";
import { BsCardImage } from "react-icons/bs";
import bp from "./assets/bp.jpg"; // Background image
import wp from "./assets/wp.jpg"; // Background image



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

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [placeType, setPlaceType] = useState("");
  const [province, setProvince] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const selectedFiles = Array.from(files).slice(0, 10);
    setImages(selectedFiles);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (placeType === "") {
        alert("กรุณาเลือกประเภทสถานที่");
        return;
    }
    if (province === "") {
        alert("กรุณาเลือกจังหวัด");
        return;
    }

    console.log({ title, desc, images, selectedTags, placeType, province });
    alert("โพสต์เรียบร้อย!");
    navigate("/Posts");
  };

  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className="relative bg-fixed bg-center bg-cover transition duration-500 flex-1"
        style={{
          backgroundImage: `url(${darkMode ? bp : wp})`,
        }}
    >
      <Navbar />
      <div className="py-28 from-white to-gray-100">
        <div className="max-w-md mx-auto p-5 bg-white dark:bg-secondary rounded-lg shadow-md border border-blue-400 dark:border-pink-400">
          <h2 className="text-xl font-semibold mb-4 text-center text-secondary dark:text-primary">
            สร้างโพสต์ใหม่
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="ชื่อร้าน/โพสต์"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border focus:outline-none text-secondary rounded px-4 py-2"
              required
            />
            <textarea
              placeholder="รายละเอียด"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full border text-secondary rounded px-4 py-2"
              rows={4}
              required
            />

            <div>
              <select
                value={placeType}
                onChange={(e) => setPlaceType(e.target.value)}
                className="w-1/3 p-2 border text-blue-600 bg-blue-100 rounded-full mr-10 "
              >
                <option value="">เลือกประเภท</option>
                {placeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-1/2 p-2 border text-green-600 bg-green-100 rounded-full "
              >
                <option value="">เลือกจังหวัด</option>
                {provinces.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => document.getElementById("image-upload")?.click()}
              className="w-full bg-primary text-xs px-10 w-14 justify-items-center dark:bg-secondary dark:text-primary border border-blue-400 dark:border-pink-400 text-secondary py-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              <BsCardImage className="text-2xl" />
              เพิ่มรูปภาพ/สูงสุด10ภาพ
            </button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden "
            />

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`preview-${idx}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-1/3 bg-blue-500 text-white py-2 mr-1 rounded hover:bg-blue-600 transition"
              >
                โพสต์
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setDesc("");
                  setImages([]);
                  setImagePreviews([]);
                  setSelectedTags([]);
                  setPlaceType("");
                  setProvince("");
                }}
                className="w-1/3 mt-2 bg-red-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
