import { useNavigate } from "react-router-dom";
import React from "react";
// import mockPosts from "../../mock/mockPost";
// import {  useContext } from "react";
// import { ThemeContext } from "../../themeContext";

// import bg from "./../assets/bg2.jpg"

import fallbackImage from "../assets/dremovebg-1.png"; // รูป fallback


interface PostCardProps {
  images: string[];
  title: string;
  type: string;
  province: string;
  postId: number; // เพิ่ม ID สำหรับใช้งาน
  description?: string; // เพิ่ม description ถ้าต้องการ
}


const PostCard = ({
  images,
  title,
  type,
  province,
  postId,
  description,
}: PostCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${postId}`, {
      state: { title, images, type, province, description },
    });
  };
  const coverImage =
    images && images.length > 0 ? images[0] : fallbackImage;
  return (
    <div
      className="bg-white dark:bg-secondary hover:scale-105 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={coverImage}
        alt={title}
        className="w-full h-48 object-contain rounded-t-lg"
        onError={(e) => {
        (e.target as HTMLImageElement).src = fallbackImage;
        }}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          ประเภท: {type} | จังหวัด: {province}
        </p>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </p>
        )}
        <div className="mt-2">
          <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {type}
          </span>
          <span className="inline-block bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full ml-2">           
            {province}
          </span>
        </div>
      </div>
    </div>
  );

};

export default PostCard;
