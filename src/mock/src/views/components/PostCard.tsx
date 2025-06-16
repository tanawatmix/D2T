import { useNavigate } from "react-router-dom";
// import mockPosts from "../../mock/mockPost";
// import {  useContext } from "react";
// import { ThemeContext } from "../../themeContext";

// import bg from "./../assets/bg2.jpg"

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
    images && images.length > 0 ? images[0] : "URL/to/your/default/image.png";

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-primary dark:bg-secondary rounded shadow p-2 hover:shadow-lg transition duration-500"
    >
      <img
        src={coverImage}
        alt={title}
        className="w-full h-40 object-contain rounded dark:text-primary transition-transform duration-500 hover:scale-105"
      />
      <h3 className="font-bold mt-2">{title}</h3>
      <p className="text-sm dark:text-primary text-gray-600">
        {type} - {province}
      </p>
    </div>
  );
};

export default PostCard;
