// src/components/Footer.tsx
import { FaGithub } from "react-icons/fa";
import { ThemeContext } from "../../ThemeContext";
import React from "react";
import { useContext } from "react";

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <footer className="dark:bg-secondary font-sriracha bg-primary mt-auto border-t transition duration-500  border-blue-400 dark:border-pink-400 ">
      <div className="container  px-3 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="md-flex mb-1">
          <h2
            className={`ml-2 text-xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 bg-clip-text text-transparent select-none bg-[length:200%_auto] animate-gradient-anim ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 via-purple-300 to-pink-400"
                : ""
            }`}
          >
            Dare2Thai
          </h2>
          <p
            className={`ml-1 text-sm font-light tracking-tight bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 bg-clip-text text-transparent select-none bg-[length:200%_auto] animate-gradient-anim ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 via-purple-300 to-pink-400"
                : ""
            }`}
          >
            © 2025 All rights reserved.
          </p>
          <p
            className={`ml-1 text-sm font-light tracking-tight bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 bg-clip-text text-transparent select-none bg-[length:200%_auto] animate-gradient-anim ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 via-purple-300 to-pink-400"
                : ""
            }`}
          >
            contact us : 088-888-888
          </p>
        </div>
        <div>
          <a
            href="https://github.com/tanawatmix"
            target="_blank"
            rel="noopener noreferrer"
            className={`dark:hover:text-sky-400 dark:text-pink-400 text-blue-400 hover:text-pink-400 ${
              darkMode ? "text-blue-400" : ""
            }`}
          >
            <FaGithub className="text-xl " />
          </a>
          <p className="ml-1 text-xs">
          6552410002
          </p>
          <a
            href="https://github.com/MOOMOO888"
            target="_blank"
            rel="noopener noreferrer"
            className={`dark:hover:text-sky-400 dark:text-pink-400 text-blue-400 hover:text-pink-400 ${
              darkMode ? "text-blue-400" : ""
            }`}
          >
            <FaGithub className="text-xl " />
          </a>
          <p className="ml-1 text-xs">
          6552410003
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
