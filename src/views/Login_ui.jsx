import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import React from "react";
import bp from "./assets/bp.jpg"; // Background image
import wp from "./assets/whiteWater.jpg"; // Background image

const Login = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("th");
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const translations = {
    th: {
      title: "เข้าสู่ระบบ",
      email: "อีเมล",
      password: "รหัสผ่าน",
      login: "เข้าสู่ระบบ",
      noAccount: "ยังไม่มีบัญชี?",
      register: "สมัครสมาชิก",
      home: "หน้าแรก",
      success: "✅ เข้าสู่ระบบสำเร็จ!",
      fillAll: "กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน",
    },
    en: {
      title: "Login",
      email: "Email",
      password: "Password",
      login: "Login",
      noAccount: "Don't have an account?",
      register: "Register",
      home: "Home",
      success: "✅ Login successful!",
      fillAll: "Please enter both email and password.",
    },
  };

  const t = translations[lang];
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setShowError(true);
      setShowSuccess(false);
      setTimeout(() => setShowError(false), 2500);
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: "123",
        username: "somchai",
        email: email,
        role: "USER",
      })
    );
    setShowSuccess(true);
    setShowError(false);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/home");
    }, 1200);
  };

  return (
    <div
      className={`font-sriracha relative min-h-screen flex items-center justify-center transition duration-500 ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-gradient-to-br from-blue-100 via-white to-pink-100 text-black"
      }`}
      style={{
        backgroundImage: `url(${darkMode ? bp : wp})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative min-h-screen flex items-center justify-center px-4 w-full">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="bg-primary-opacity-50 dark:bg-secondary-opacity-50 border-2 border-blue-400 dark:border-white shadow-2xl rounded-3xl p-10 max-w-md w-full relative backdrop-blur-lg"
        >
          {/* Language & Theme Switcher */}
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10">
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

          {/* Back to Home Button */}
          <button
            className="absolute left-4 top-4 bg-gradient-to-r from-blue-400 to-pink-400 text-white px-4 py-2 rounded-full shadow hover:scale-125 hover:from-pink-400 hover:to-blue-400 transition font-semibold"
            onClick={() => navigate("/")}
          >
            {t.home}
          </button>

          <h3 className="text-3xl font-extrabold dark:text-pink-400 text-blue-500 mb-8 text-center drop-shadow">
            {t.title}
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 font-semibold">
                {t.email}
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border-2 border-blue-400 dark:border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 transition bg-white/80 dark:bg-gray-800/80"
                placeholder={t.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />

              <label
                htmlFor="password"
                className="block mt-4 mb-2 font-semibold"
              >
                {t.password}
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border-2 border-blue-400 dark:border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 transition bg-white/80 dark:bg-gray-800/80"
                placeholder={t.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-blue-400 to-pink-400  text-white font-bold p-3 rounded-lg w-full shadow hover:from-pink-400 hover:to-blue-400 transition"
              type="submit"
            >
              {t.login}
            </motion.button>
          </form>

          <p className="mt-6 text-center">
            {t.noAccount}
            <span
              className="font-extrabold dark:text-pink-400 text-blue-500 cursor-pointer hover:text-pink-500 dark:hover:text-blue-400 transition ml-1"
              onClick={() => navigate("/register")}
            >
              {t.register}
            </span>
          </p>
        </motion.div>

        {/* Success & Error Messages */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="fixed top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-center z-50"
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
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="fixed translate-x-1/2 bg-red-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-center z-50"
            >
              {t.fillAll}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
