import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import bp from "./assets/bp.jpg";
import wp from "./assets/whiteWater.jpg";
import pro from "./assets/D2win.png";

const translations = {
  th: {
    title: "ลงทะเบียน",
    email: "อีเมล",
    password: "รหัสผ่าน",
    username: "ชื่อผู้ใช้",
    conpassword: "ยืนยันรหัสผ่าน",
    login: "ลงทะเบียน",
    haveAccount: "มีบัญชีแล้ว?",
    register: "เข้าสู่ระบบ",
    home: "หน้าแรก",
    success: "✅ เข้าสู่ระบบสำเร็จ!",
    fillAll: "กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน",
    enUserN: "กรอกชื่อผู้ใช้",
    enPass: "กรอกรหัสผ่าน",
    enMail: "กรอกอีเมล",
    enConPass: "ยืนยันรหัสผ่านของคุณ",
    Optional: "ไม่จำเป็น",
    en: "English",
    th: "ไทย",
    selectAvatar: "เลือกรูปโปรไฟล์",
  },
  en: {
    title: "Register",
    email: "Email",
    password: "Password",
    username: "Username",
    conpassword: "Confirm Password",
    login: "Register",
    haveAccount: "Already have an account?",
    register: "Login",
    home: "Home",
    success: "✅ Registration successful!",
    fillAll: "Please enter all fields.",
    enUserN: "Enter your username",
    enPass: "Enter your password",
    enMail: "Enter your email",
    enConPass: "Confirm your password",
    Optional: "Optional",
    en: "English",
    th: "ไทย",
    selectAvatar: "Select Profile Picture",
  },
};

const Register = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [lang, setLang] = useState("th");
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const t = translations[lang];

  const handleRegister = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      window.location.href = "/login";
    }, 1200);
  };

  return (
    <div
      className="font-sriracha bg-fixed bg-cover min-h-screen"
      style={{
        backgroundImage: `url(${darkMode ? bp : wp})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="border-2 bg-primary-opacity-50 dark:bg-black-opacity-50 border-blue-400 dark:border-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full relative backdrop-blur-md flex flex-col md:flex-row gap-8">
          {/* Left: Avatar & Controls */}
          <div className="flex-1 flex flex-col justify-center items-center gap-6 border-r-0 md:border-r md:pr-8 border-blue-400">
            <div className="absolute top-0 right-0 flex flex-col items-end gap-2 z-10">
              <button
                className="text-xs font-semibold py-1 px-4 mr-2 mt-2 rounded-full border border-blue-400 dark:border-white bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-pink-400 hover:bg-blue-100 dark:hover:bg-pink-900 transition"
                onClick={() => setLang(lang === "th" ? "en" : "th")}
                aria-label="Switch language"
              >
                {lang === "th" ? "EN" : "ไทย"}
              </button>
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 text-xs mr-2 font-semibold py-1 px-4 rounded-full border border-blue-400 dark:border-white bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-pink-400 hover:bg-blue-100 dark:hover:bg-pink-900 transition"
              >
                {darkMode ? (
                  <>
                    <span>Light</span>
                    <span role="img" aria-label="Light mode">
                      ☀️
                    </span>
                  </>
                ) : (
                  <>
                    <span>Dark</span>
                    <span role="img" aria-label="Dark mode">
                      🌙
                    </span>
                  </>
                )}
              </button>
            </div>
            <button
              className="absolute top-4 left-4 bg-pink-600 text-white py-2 px-4 rounded-full hover:from-black hover:to-orange-400 hover:text-white font-semibold shadow transition duration-300"
              onClick={() => (window.location.href = "/")}
            >
              {t.home}
            </button>
            <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-pink-400 to-orange-400 mb-8 text-center drop-shadow">
              {t.title}
            </h3>
            <div className="flex items-center justify-center mt-1 mb-1">
              <img
                src={pro}
                className="w-40 h-40 rounded-2xl border border-blue-400 text-secondary dark:border-pink-400 object-cover"
                alt="Avatar"
              />
            </div>
            <div>
              <button className="bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold p-3 rounded-lg hover:from-orange-400 hover:to-pink-400 w-full shadow transition duration-300">
                {t.selectAvatar}
              </button>
              <h3 className="text-xs font-bold text-gray-700 dark:text-gray-200">
                {t.Optional}
              </h3>
            </div>
          </div>
          {/* Right: Form */}
          <div className="flex-1 mt-5 relative flex flex-col justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              className="space-y-4"
            >
              <InputField
                id="email"
                label={t.email}
                placeholder={t.enMail}
                type="email"
                required
              />
              <InputField
                id="UserName"
                label={t.username}
                placeholder={t.enUserN}
                type="text"
                required
              />
              <InputField
                id="password"
                label={t.password}
                placeholder={t.enPass}
                type="password"
                required
              />
              <InputField
                id="ConfirmPassword"
                label={t.conpassword}
                placeholder={t.enConPass}
                type="password"
                required
              />
              <button
                className="bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold p-3 rounded-lg hover:from-orange-400 hover:to-pink-400 w-full shadow transition duration-300"
                type="submit"
              >
                {t.login}
              </button>
            </form>
            <p className="mt-4 text-center text-gray-700 dark:text-gray-200">
              {t.haveAccount}{" "}
              <span
                className="font-extrabold text-pink-500 cursor-pointer hover:text-orange-400 transition"
                onClick={() => (window.location.href = "/login")}
              >
                {t.register}
              </span>
            </p>
          </div>
        </div>
        {/* Success Notification */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 border-2 border-dashed border-white text-white font-bold px-8 py-4 rounded-xl shadow-2xl text-center z-50"
            >
              {t.success}
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
    </div>
  );
};

// Reusable input field component
function InputField({ id, label, placeholder, type, required }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-white/80 dark:bg-gray-800/80 transition"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default Register;
