import React from "react";
type CardProps = {
  image: string;
  title: string;
  description: string;
};

const Card: React.FC<CardProps> = ({ image, title, description }) => {
  return (
    <div className="font-sriracha py-20 px-5">
      <div className=" max-w-5xl w-full border rounded-lg p-5 hover:shadow-lg transition-shadow duration-300 object-center mx-auto bg-white ">
        <img src={image} alt={title} className="object-contain w-full h-80 " />
        <div className="mt-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-pink-400 to-orange-300 bg-clip-text text-transparent text-center">{title}</h1>
          <p className="text-gray-600 mt-2 text-left">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
