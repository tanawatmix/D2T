import React, { useState, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import getCroppedImg from "../../src/views/assets/utils/cropImage"; // ฟังก์ชันสำหรับครอปภาพ
import Profile from "./assets/nay.jpg";
// import bg from "./assets/bg2.jpg";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";

import bp from "./assets/bp.jpg"; // Background image
import wp from "./assets/wp.jpg";

const ProfileUI = () => {
  const [avatar, setAvatar] = useState(Profile);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const handleSaveEdit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1000); // แสดง 2 วินาทีก่อนเปลี่ยนหน้า
  };

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
        setOpen(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setAvatar(croppedImage);
      setOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="relative bg-fixed bg-center bg-cover transition duration-500 flex-1"
      style={{
        backgroundImage: `url(${darkMode ? bp : wp})`,
      }}
    >
      <Navbar />
      <div className="flex justify-center pt-20 pb-10">
        <div className="bg-primary-opacity-50 backdrop-blur-lg border-2 border-blue-400 dark:border-pink-400 dark:bg-secondary-opacity-50 text-secondary dark:text-primary font-bold p-8 rounded-md shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-2 underline text-center">
            Your Personal Information
          </h2>

          <div className="flex items-center justify-center mt-4 mb-4 ">
            <img
              src={avatar}
              className="w-40 h-40 rounded-2xl border border-blue-400 text-secondary dark:border-pink-400 object-cover"
              alt="Avatar"
            />
            <div>
              <input
                type="file"
                accept="image/*"
                id="avatar-upload"
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <label
              htmlFor="avatar-upload"
              className="bg-primary dark:bg-secondary dark:hover:bg-primary dark:hover:text-secondary text-secondary dark:text-primary px-1 py-2 rounded cursor-pointer hover:bg-secondary hover:text-white transition border border-blue-400 text-secondary dark:border-pink-400"
            >
              Change avatar
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Username</label>
            <input
              maxLength={15}
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 rounded border border-blue-400 text-secondary dark:border-pink-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 rounded border border-blue-400 text-secondary dark:border-pink-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 rounded border border-blue-400 text-secondary dark:border-pink-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 rounded border border-blue-400 text-secondary dark:border-pink-400"
            />
          </div>

          <button
            className="bg-primary dark:bg-secondary border-blue-400 dark:border-pink-400 text-secondary dark:text-primary hover:text-primary hover:bg-secondary dark:hover:text-secondary dark:hover:bg-primary font-bold px-6 py-2 ml-2 rounded transition border"
            onClick={handleSaveEdit}
          >
            Save
          </button>
          <button
            className="bg-primary dark:bg-secondary border-blue-400 text-secondary dark:border-pink-400 dark:text-primary hover:text-primary hover:bg-secondary dark:hover:text-secondary dark:hover:bg-primary font-bold px-6 py-2 ml-2 rounded transition border"
            onClick={() => (window.location.href = "/home")}
          >
            back
          </button>
        </div>
      </div>
      <Footer />

      {/* Modal for cropping image */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="absolute top-1/2 left-1/2 w-[90vw] max-w-[500px] bg-white dark:bg-secondary p-4 rounded shadow transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-full h-60 bg-gray-200">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_e, z) => setZoom(z as number)}
            className="mt-4"
          />
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveImage}
              className="bg-blue-500 text-white px-4  py-2 rounded"
            >
              Save
            </button>
          </div>
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 10, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-10 bg-primary border-2 border-dashed border-black text-white bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 font-bold px-6 py-3 rounded-lg shadow-lg text-center"
              >
                ✅ ลงทะเบียนสำเร็จ!
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "linear" }}
                  className="h-1 bg-white mt-3 rounded-lg"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-primary border-2 border-dashed border-black text-white bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 font-bold px-6 py-3 rounded-lg shadow-lg text-center absolute top-10">
              ✅ บันทึกแล้ว!
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "linear" }}
                className="h-1 bg-white mt-3 rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileUI;
