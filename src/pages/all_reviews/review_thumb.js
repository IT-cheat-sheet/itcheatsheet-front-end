import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviewImage } from "../../core/service/getSheet";

export default function ReviewThumb({ review }) {
  const [image, setImage] = useState(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    (async function() {
      try {
        setImage(null);

        const res = await getReviewImage(review.reviewId);
      
        if(res.status === 200){
          if (res.data.type.includes("image")) {
            var reader = new FileReader();
            reader.onload = (e) => {
              setImage(e.target.result);
            };
            reader.readAsDataURL(res.data);
          }
        }
      } catch (err) {
        console.log(err)
      }
    })();
  }, [review])

  return (
    <div className={`py-4 md:p-3 ${image ? "h-96" : "h-56"} md:h-72`}>
      <Link key={review.reviewId} to={`/reviews/${review.reviewId}`}>
        <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`relative grid grid-rows-5 md:grid-rows-2 md:grid-cols-12 h-full rounded-lg shadow-halo transition duration-200 transform cursor-pointer ${isHover ? "bg-blue-button text-white" : "bg-lightblue-bg text-blue-body"}`}>
          {image ? <div className="row-span-3 md:col-span-5"><img className="object-cover w-full h-full rounded-t-lg md:rounded-r-none md:rounded-l-lg" src={image} alt="Not Found"/></div> : ""}
          <div className={`${image ? "row-span-2 md:col-span-7" : "row-span-6 md:row-span-full md:col-span-12"} flex flex-col justify-center px-9 py-5`}>
            <div className={`md:hidden w-full body-base font-bold mb-1 truncate`}>
              {review.reviewTitle}
            </div>
            <div className={`hidden md:block w-full body-l font-bold mb-1 truncate`}>
              {review.reviewTitle}
            </div>
            <div className={`text-sm tracking-wide md:leading-6 ${image ? "line-clamp-3 md:line-clamp-4" : "line-clamp-5 md:line-clamp-6"}`} style={{textIndent: image ? '0' : '5%'}}>
              {review.reviewContent}
            </div>
          </div>
          <div
          className={`hidden transition duration-200 rounded-lg md:flex justify-center items-center transform absolute z-10 w-full h-full my-auto header-tertiary text-white bg-gradient-to-t from-dark to-light ${isHover ? "opacity-1" : "opacity-0"}`}>read more</div>
        </div>
      </Link>
    </div>
  );
}
