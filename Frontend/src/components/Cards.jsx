import React, { useState } from "react";

function Cards({ item }) {
  const [showMore, setShowMore] = useState(false);

  const handleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="mt-4 my-3 p-5">
      <div className="card bg-base-100 w-80 shadow-xl hover:scale-105 duration-200 dark:border flex flex-col justify-between">
        {/* Make the figure fill the card width */}
        <figure className="w-full">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-64 object-cover border-b border-gray-300" // Ensures the image fills the container, touching the edges
          />
        </figure>
        <div className="card-body flex-grow flex flex-col justify-between">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p className="text-sm">
            {showMore ? item.title : `${item.title.substring(0, 100)}...`}
            <span
              onClick={handleReadMore}
              className="text-blue-500 cursor-pointer ml-2"
            >
              {showMore ? "Show Less" : "Read More about the novel"}
            </span>
          </p>
          <div className="card-actions justify-between mt-2">
            <span className="text-gray-600">
              Enjoy reading more details about the novel.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
