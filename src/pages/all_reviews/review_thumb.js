import React, { useEffect, useState } from "react";

export default function ReviewThumb({ review }) {
  const [image, setImage] = useState(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    (async function() {
      const res = await fetch(`http://localhost:3000/review/image/${review.reviewId}`);
      const data = await res.data;
      
      if(res.status === 200){
        setImage(data);
      }
    })();
  }, [review])

  return (
    <div className="p-3">
      <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`relative grid grid-cols-12 h-full rounded-lg shadow-halo transition duration-200 transform cursor-pointer ${isHover ? "bg-blue-button text-white" : "bg-lightblue-bg text-blue-body"}`}>
        {image ? <div className="col-span-5"><img className="object-cover w-full h-full rounded-l-lg" src={image} alt="Not Found"/></div> : ""}
        <div className={`${review.reviewImage ? "col-span-7 py-14" : "col-span-12 py-8"} px-9`}>
          <div className="w-full body-l font-bold mb-3">
            {review.reviewTitle}
          </div>
          <div className={`body-sm ${review.reviewImage ? "line-clamp-4" : "line-clamp-6"}`}>
            {review.reviewContent}
          </div>
        </div>
        <div
        className={`transition duration-200 rounded-lg flex justify-center items-center transform absolute z-10 w-full h-full my-auto header-tertiary text-white bg-gradient-to-t from-dark to-light ${isHover ? "opacity-1" : "opacity-0"}`}>read more</div>
      </div>
    </div>
  );
}
