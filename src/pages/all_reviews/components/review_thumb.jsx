import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviewImage } from "../../../core/service/getSheet";

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
    <div className={`py-4 md:p-3 w-full ${image ? "h-96" : "h-56"} md:h-72`}>
      <Link key={review.reviewId} to={`/reviews/${review.reviewId}`}>
        <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`relative flex flex-col md:flex-row h-full rounded-lg shadow-halo transition duration-200 transform cursor-pointer w-full ${isHover ? "bg-blue-button text-white" : "bg-lightblue-bg text-blue-body"}`}>
          {image && <div className="h-3/5 w-full md:w-5/12 md:h-full"><img className="object-cover w-full h-full rounded-t-lg md:rounded-r-none md:rounded-l-lg" src={image} alt="Not Found"/></div>}
          <div className={`${image ? "h-2/5 md:w-7/12 md:h-full" : "h-full"} w-full flex flex-col justify-center pt-3 md:pt-5 pb-5 lg:pb-10 px-5 md:px-4 lg:px-10`}>
            <div className={`w-full text-2xl md:text-4xl font-semibold mb-1 line-clamp-1 break-words`}>
              {review.reviewTitle}
            </div>
            {/* <div className={`hidden md:block w-full text-4xl font-bold mb-1 truncate`}>
              {review.reviewTitle}
            </div> */}
            <div className={`text-sm tracking-wide break-words md:leading-6 overflow-x-hidden w-full ${image ? "line-clamp-3 md:line-clamp-4" : "line-clamp-5 md:line-clamp-6"}`} style={{textIndent: image ? '0' : '5%'}}>
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
