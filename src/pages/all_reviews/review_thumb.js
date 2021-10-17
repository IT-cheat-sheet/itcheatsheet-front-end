import React, { useEffect, useState } from "react";

export default function ReviewThumb({ review }) {
  const [image, setImage] = useState(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    (async function() {
      const res = await fetch(`http://localhost:3000/review/image/${review.reviewId}`);
      const data = await res.blob();
      
      if(res.status === 200){
        if (data.type.includes("image")) {
          var reader = new FileReader();
          reader.onload = (e) => {
            setImage(e.target.result);
          };
          reader.readAsDataURL(data);
        }
      } else {
        setImage(null);
      }
    })();
  }, [review])

  return (
    <div className="p-3 h-72">
      <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`relative grid grid-cols-12 h-full rounded-lg shadow-halo transition duration-200 transform cursor-pointer ${isHover ? "bg-blue-button text-white" : "bg-lightblue-bg text-blue-body"}`}>
        {image ? <div className="col-span-5"><img className="object-cover w-full h-full rounded-l-lg" src={image} alt="Not Found"/></div> : ""}
        <div className={`${image ? "col-span-7" : "col-span-12"} flex flex-col justify-center px-9`}>
          <div className={`w-full body-l font-bold mb-1 truncate`}>
            {review.reviewTitle}
          </div>
          <div className={`body-sm ${image ? "line-clamp-4" : "line-clamp-6"}`} style={{textIndent: image ? '0' : '5%'}}>
            {review.reviewContent}
          </div>
        </div>
        <div
        className={`transition duration-200 rounded-lg flex justify-center items-center transform absolute z-10 w-full h-full my-auto header-tertiary text-white bg-gradient-to-t from-dark to-light ${isHover ? "opacity-1" : "opacity-0"}`}>read more</div>
      </div>
    </div>
  );
}
