import React, { useState, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";
import Profile from "./assets/nay.jpg";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import bp from "./assets/bp.jpg";
import wp from "./assets/whiteWater.jpg";

const initialForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const ProfileUI = () => {
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState(Profile);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState(initialForm);
  const { darkMode } = useContext(ThemeContext);

  const handleSaveEdit = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1000);
  };

  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setAvatar(croppedImage);
      setOpen(false);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className="font-sriracha text-black relative bg-fixed bg-center bg-cover transition duration-500 flex-1 min-h-screen"
      style={{ backgroundImage: `url(${darkMode ? bp : wp})` }}
    >
      <Navbar />
      <div className="flex justify-center pt-20 pb-10">
        <div className="bg-primary-opacity-50 backdrop-blur-lg border-2 border-blue-400 dark:border-pink-400 dark:bg-secondary-opacity-50 dark:text-primary font-bold p-8 rounded-md shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-2 underline text-center">
            {t("YourProfile")}
          </h2>
          <div className="flex flex-col items-center mt-4 mb-4 gap-2">
            <img
              src={avatar}
              className="w-40 h-40 rounded-2xl border border-blue-400 dark:border-pink-400 object-cover"
              alt="Avatar"
            />
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              className="hidden"
              onChange={handleImageSelect}
            />
            <label
              htmlFor="avatar-upload"
              className="bg-primary dark:bg-secondary dark:hover:bg-primary dark:hover:text-secondary text-secondary dark:text-primary px-3 py-2 rounded cursor-pointer hover:bg-secondary hover:text-white transition border border-blue-400 dark:border-pink-400"
            >
              {t("ChangAvatar")}
            </label>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit();
            }}
          >
            <div className="mb-4">
              <label className="block text-sm mb-1">{t("Username")}</label>
              <input
                maxLength={15}
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-2 rounded border border-blue-400 dark:border-pink-400"
                autoComplete="username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">{t("Email")}</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 rounded border border-blue-400 dark:border-pink-400"
                autoComplete="email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">{t("Pass")}</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 rounded border border-blue-400 dark:border-pink-400"
                autoComplete="new-password"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm mb-1">{t("ConPass")}</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 rounded border border-blue-400 dark:border-pink-400"
                autoComplete="new-password"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="submit"
                className="bg-green-500 dark:bg-green-400 border-blue-400 dark:border-pink-400 text-secondary dark:text-primary hover:text-primary hover:bg-secondary dark:hover:text-secondary dark:hover:bg-primary font-bold px-6 py-2 rounded transition border"
              >
                {t("save")}
              </button>
              <button
                type="button"
                className="bg-red-500 dark:bg-red-400 border-blue-400 text-secondary dark:border-pink-400 dark:text-primary hover:text-primary hover:bg-secondary dark:hover:text-secondary dark:hover:bg-primary font-bold px-6 py-2 rounded transition border"
                onClick={() => (window.location.href = "/home")}
              >
                {t("back")}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />

      {/* Modal for cropping image */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="absolute font-sriracha top-1/2 left-1/2 w-[90vw] max-w-[500px] bg-white dark:bg-secondary p-4 rounded shadow transform -translate-x-1/2 -translate-y-1/2">
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
            onChange={(_e, z) => setZoom(z)}
            className="mt-4"
          />
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              {t("Cancel") || "Cancel"}
            </button>
            <button
              onClick={handleSaveImage}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {t("Save") || "Save"}
            </button>
          </div>
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
              ✅ {t("Saved") || "บันทึกแล้ว!"}
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
