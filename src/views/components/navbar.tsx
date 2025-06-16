import React, { useState, useEffect, useContext } from "react";
import { FiMenu, FiX, FiUser, FiMoon, FiSun } from "react-icons/fi";
import logo from "../assets/dare2New.png";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { changeLanguage } from "i18next";

const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    null
  );
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const TOGGLE_CLASSES =
    "text-sm font-medium font-sriracha flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

  type ToggleOptionsType = "light" | "dark";

  // Helper for nav buttons
  const NavButton = ({
    to,
    children,
    className = "",
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { to: string }) => (
    <button
      onClick={() => (window.location.href = to)}
      className={`font-sriracha transition duration-300 font-bold px-2 py-1 rounded hover:bg-gradient-to-r hover:from-pink-400 hover:to-orange-200  ${
        darkMode
          ? "bg-gradient-to-r from-blue-500 via-purple-300 to-pink-400 bg-clip-text text-transparent"
          : "bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 bg-clip-text text-transparent"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
  const [selected, setSelected] = useState<ToggleOptionsType>("light");

  // sync selected toggle with current themeห
  useEffect(() => {
    setSelected(darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/home"; // หรือ redirect ไปหน้าที่ต้องการ
  };

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <nav className="font-sriracha border-b border-blue-400 dark:border-white bg-primary dark:bg-secondary py-4 px-6 fixed w-full z-50 shadow transition duration-500">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => (window.location.href = "/home")}
        >
          <img src={logo} alt="logo" className="h-10 w-20 object-contain" />
          <span
            className={`font-sriracha ml-2 text-xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 bg-clip-text text-transparent select-none bg-[length:200%_auto] animate-gradient-anim  ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 via-purple-300 to-pink-400"
                : ""
            }`}
          >
            Dare2Thai
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 ">
          <NavButton to="/Posts">{t("place")}</NavButton>
          <NavButton to="/home">{t("home")}</NavButton>
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="font-bold text-red-500 hover:text-red-700 transition"
              >
                {t("logout")}
              </button>
              <NavButton
                to="/profile"
                className="flex items-center bg-[length:200%_auto] animate-gradient-anim "
              >
                <FiUser className="mr-1 text-xl text-secondary dark:text-white " />
                {t("hello_ฮี้ย้า", { name: user?.username })}
              </NavButton>
            </>
          ) : (
            <>
              <NavButton to="/register">{t("register")}</NavButton>
              <NavButton to="/login">{t("login")}</NavButton>
            </>
          )}

          {/* Language Switch */}
          <select
            onChange={(e) => changeLanguage(e.target.value as "en" | "th")}
            value={i18n.language}
            className="border rounded px-2 py-1 text-black border-secondary dark:text-white dark:border-white dark:bg-secondary hover:text-secondary transition duration-300"
          >
            <option value="th">ภาษาไทย</option>
            <option value="en">ENGLISH</option>
          </select>

          {/* Dark Mode Toggle */}
          <div className="relative flex w-fit items-center rounded-full">
            <button
              className={`${TOGGLE_CLASSES} ${
                selected === "dark" ? "text-white" : "text-slate-300"
              }`}
              onClick={() => {
                setSelected("light");
                if (darkMode) toggleDarkMode();
              }}
            >
              <FiMoon className="relative z-10 text-lg md:text-sm" />
              <span className="relative z-10">Light</span>
            </button>
            <button
              className={`${TOGGLE_CLASSES} ${
                selected === "dark" ? "text-white" : "text-slate-800"
              }`}
              onClick={() => {
                setSelected("dark");
                if (!darkMode) toggleDarkMode();
              }}
            >
              <FiSun className="relative z-10 text-lg md:text-sm" />
              <span className="relative z-10">Dark</span>
            </button>
            <div
              className={`absolute inset-0 z-0 flex ${
                selected === "dark" ? "justify-end" : "justify-start"
              }`}
            >
              <motion.span
                layout
                transition={{ type: "spring", damping: 15, stiffness: 250 }}
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-secondary dark:text-white transition duration-500">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-2 bg-primary dark:bg-secondary rounded p-4 transition duration-500">
            <NavButton to="/Posts">{t("place")}</NavButton>
            <NavButton to="/home">{t("home")}</NavButton>
            {!isLoggedIn ? (
              <>
                <NavButton to="/register">{t("register")}</NavButton>
                <NavButton to="/login">{t("login")}</NavButton>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="font-bold text-red-500 hover:text-red-700 transition"
                >
                  {t("logout")}
                </button>
                <NavButton
                  to="/profile"
                  className="flex items-center justify-center "
                >
                  <FiUser className="mr-1 text-secondary dark:text-primary " />
                  {t("hello_user", { name: user?.username })}
                </NavButton>
              </>
            )}

            <select
              onChange={(e) => changeLanguage(e.target.value as "en" | "th")}
              value={i18n.language}
              className="border rounded text-center px-2 py-1 text-black border-secondary dark:text-white dark:border-white dark:bg-secondary hover:text-secondary"
            >
              <option value="th">ภาษาไทย</option>
              <option value="en">ENGLISH</option>
            </select>

            <div className="relative flex w-fit rounded-full">
              <button
                className={`${TOGGLE_CLASSES} ${
                  selected === "light" ? "text-white" : "text-slate-300"
                }`}
                onClick={() => {
                  setSelected("light");
                  if (darkMode) toggleDarkMode();
                }}
              >
                <FiMoon className="relative z-10 text-lg md:text-sm" />
                <span className="relative z-10">Light</span>
              </button>
              <button
                className={`${TOGGLE_CLASSES} ${
                  selected === "dark" ? "text-white" : "text-slate-800"
                }`}
                onClick={() => {
                  setSelected("dark");
                  if (!darkMode) toggleDarkMode();
                }}
              >
                <FiSun className="relative z-10 text-lg md:text-sm" />
                <span className="relative z-10">Dark</span>
              </button>
              <div
                className={`absolute inset-0 z-0 flex ${
                  selected === "dark" ? "justify-end" : "justify-start"
                }`}
              >
                <motion.span
                  layout
                  transition={{ type: "spring", damping: 15, stiffness: 250 }}
                  className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
