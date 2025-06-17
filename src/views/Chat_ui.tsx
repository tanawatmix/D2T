import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import React from "react";

import pic from "./assets/picture.png";
import send from "./assets/send.png";
import bp from "./assets/bp.jpg"; // Background image
import wp from "./assets/whiteWater.jpg"; 
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

type Message = {
  type: "text" | "image" | "video";
  content: string;
};

const ChatUI = () => {
  const location = useLocation();
  const title = location.state?.title ?? "ไม่ทราบชื่อโพสต์";
  const { darkMode } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [showScrollButton, setShowScrollButton] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      const isScrolledUp =
        container.scrollHeight - container.scrollTop >
        container.clientHeight + 50;

      if (isScrolledUp && messages.length > 0) {
        setShowScrollButton(true);
      } else {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
    setShowScrollButton(false);
  };

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 5;
      if (isAtBottom) {
        setShowScrollButton(false);
      }
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: "text", content: input }]);
      setInput("");
    }
  };

  const handleMediaSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const mediaUrl = URL.createObjectURL(file);
      const isVideo = file.type.startsWith("video/");
      const type = isVideo ? "video" : "image";

      setMessages([...messages, { type, content: mediaUrl }]);
    }
  };

  return (
    <div
      className="font-sriracha relative bg-fixed bg-center bg-cover transition duration-500 flex-1"
      style={{
        backgroundImage: `url(${darkMode ? bp : wp})`,
      }}
    >
      <Navbar />

      <div className="flex-grow px-4 py-20 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4 text-secondary dark:text-primary">
          แชทสำหรับโพสต์: {title}
        </h1>

        <div className="relative">
          <div
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="bg-white rounded shadow border border-blue-400 dark:border-pink-400 h-96 overflow-y-auto p-4 mb-4"
          >
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">ยังไม่มีข้อความ</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="mb-2 text-right">
                  {msg.type === "text" ? (
                    <div className="inline-block bg-pink-300 text-white px-3 py-1 rounded-lg">
                      {msg.content}
                    </div>
                  ) : msg.type === "image" ? (
                    <div className="inline-block bg-pink-100 p-1 rounded-lg">
                      <img
                        src={msg.content}
                        alt="ส่งรูป"
                        className="max-w-xs max-h-48 rounded"
                      />
                    </div>
                  ) : (
                    <div className="inline-block bg-pink-100 p-1 rounded-lg">
                      <video
                        src={msg.content}
                        controls
                        className="max-w-xs max-h-48 rounded"
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          {showScrollButton && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-6 right-4 bg-blue-400 dark:bg-pink-400 text-white rounded-full p-2 shadow-lg hover:bg-pink-400 dark:hover:bg-blue-400 transition-opacity duration-300"
              aria-label="Scroll to bottom"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="พิมพ์ข้อความ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border border-blue-400 dark:border-pink-400 rounded"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            className="bg-blue-400 dark:bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-400 dark:hover:bg-blue-400"
          >
            <img src={send} alt="ส่ง" className="w-6 h-6" />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-400 dark:bg-pink-400 px-4 py-2 rounded hover:bg-pink-400 dark:hover:bg-blue-400"
          >
            <img src={pic} alt="เลือกรูป" className="w-6 h-6 cursor-pointer" />
          </button>

          <input
            type="file"
            accept="image/*, video/*"
            ref={fileInputRef}
            onChange={handleMediaSelect}
            style={{ display: "none" }}
          />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 border border-blue-400 dark:border-pink-400 w-full bg-white font-bold hover:bg-secondary hover:text-white text-black py-2 rounded"
        >
          กลับ
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ChatUI;
