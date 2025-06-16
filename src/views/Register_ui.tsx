import { useState, useContext } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import { FaGoogle, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import bp from "./assets/fire1.jpg"; // Background image
import wp from "./assets/whiteWater.jpg"; // Background image

const Login: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [lang, setLang] = useState<"th" | "en">("th");
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

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
      RegisterGoo: "สมัครด้วย Google",
      RegisterFace: "สมัครด้วย Facebook",
      RegisterIns: "สมัครด้วย Instagram",
      RegisterTwit: "สมัครด้วย Twitter",
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
      RegisterGoo: "Register with Google",
      RegisterFace: "Register with Facebook",
      RegisterIns: "Register with Instagram",
      RegisterTwit: "Register with Twitter",
    },
  };

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
      className="bg-fixed bg-cover min-h-screen"
      style={{
        backgroundImage: `url(${darkMode ? bp : wp}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="border-2 bg-primary dark:bg-zinc-950 border-blue-400 dark:border-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full relative backdrop-blur-md flex flex-col md:flex-row gap-8">
          {/* Left: Social Buttons */}
          <div className="flex-1 flex flex-col justify-center items-center gap-6 border-r-0 md:border-r md:pr-8 border-blue-200">
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
              {lang === "th" ? "สมัครด้วย" : "Sign up with"}
            </h3>
            <div className="flex flex-col gap-4 w-full">
              <button
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 bg-white/80 dark:bg-gray-800/80 hover:bg-pink-100 dark:hover:bg-pink-900 text-gray-700 dark:text-gray-200 font-semibold shadow transition w-full"
                onClick={() => alert("Register with Google clicked")}
                type="button"
              >
                <FaGoogle className="text-xl text-green-600" />
                {t.RegisterGoo}
              </button>
              <button
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 bg-white/80 dark:bg-gray-800/80 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-200 font-semibold shadow transition w-full"
                onClick={() => alert("Register with Facebook clicked")}
                type="button"
              >
                <FaFacebook className="text-xl text-blue-600" />
                {t.RegisterFace}
              </button>
              <button
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 bg-white/80 dark:bg-gray-800/80 hover:bg-pink-100 dark:hover:bg-pink-900 text-gray-700 dark:text-gray-200 font-semibold shadow transition w-full"
                onClick={() => alert("Register with Instagram clicked")}
                type="button"
              >
                <FaInstagram className="text-xl text-pink-600" />
                {t.RegisterIns}
              </button>
              <button
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 bg-white/80 dark:bg-gray-800/80 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-200 font-semibold shadow transition w-full"
                onClick={() => alert("Register with Twitter clicked")}
                type="button"
              >
                <FaTwitter className="text-xl text-blue-400" />
                {t.RegisterTwit}
              </button>
            </div>
          </div>
          {/* Right: Form and Controls */}
          <div className="flex-1 relative flex flex-col justify-center">
            {/* Top right controls */}
            <div className="absolute top-0 right-0 flex flex-col items-end gap-2 z-10">
              <button
                className="text-xs font-semibold py-1 px-4 rounded-full border border-blue-400 dark:border-white bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-pink-400 hover:bg-blue-100 dark:hover:bg-pink-900 transition"
                onClick={() => setLang(lang === "th" ? "en" : "th")}
                aria-label="Switch language"
              >
                {lang === "th" ? "EN" : "ไทย"}
              </button>
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 text-xs font-semibold py-1 px-4 rounded-full border border-blue-400 dark:border-white bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-pink-400 hover:bg-blue-100 dark:hover:bg-pink-900 transition"
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
            {/* Home Button */}
            <button
              className="bg-pink-600 text-white mt-4 py-2 rounded-full hover:from-black hover:to-orange-400 hover:text-white mb-6 font-semibold shadow transition duration-300 w-20 "
              onClick={() => (window.location.href = "/")}
            >
              {t.home}
            </button>
            {/* Title */}
            <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-pink-400 to-orange-400 mb-8 text-center drop-shadow">
              {t.title}
            </h3>
            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
                >
                  {t.email}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-white/80 dark:bg-gray-800/80 transition"
                  placeholder={t.enMail}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="UserName"
                  className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
                >
                  {t.username}
                </label>
                <input
                  type="text"
                  id="UserName"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-white/80 dark:bg-gray-800/80 transition"
                  placeholder={t.enUserN}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
                >
                  {t.password}
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-white/80 dark:bg-gray-800/80 transition"
                  placeholder={t.enPass}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="ConfirmPassword"
                  className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
                >
                  {t.conpassword}
                </label>
                <input
                  type="password"
                  id="ConfirmPassword"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-white/80 dark:bg-gray-800/80 transition"
                  placeholder={t.enConPass}
                  required
                />
              </div>
              <button
                className="bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold p-3 rounded-lg hover:from-orange-400 hover:to-pink-400 w-full shadow transition duration-300"
                type="submit"
              >
                {t.login}
              </button>
            </form>
            {/* Already have account */}
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

export default Login;
