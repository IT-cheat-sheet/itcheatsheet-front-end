import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getReviewImage } from "../../../core/service/getSheet";

export default function RecommendedBlock({ review }) {
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
        } else {
          setImage(null);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [review])

  return (
    <Link to={`/reviews/${review.reviewId}`}>
      <div 
        className={`w-full grid grid-cols-10 text-blue-body bg-lightblue-bg rounded-lg h-full md:h-44 cursor-pointer transform transition duration-200 ${isHover ? "scale-105":""}`} 
        onMouseEnter={() => setIsHover(true)} 
        onMouseLeave={() => setIsHover(false)}
        >
        {image ?
          <div className="col-span-3 md:col-span-4">
            <img src={image} className="h-full w-full md:h-44 object-cover rounded-l-lg" alt="review"/>
          </div>
          : <></>
        }
        <div className={`py-3 px-5 md:p-6 table ${image ? "col-span-7 md:col-span-6" : "col-span-10"}`}>
          <div className="table-cell align-middle">
            <h5 className="text-lg md:text-2xl font-bold w-full line-clamp-1 break-all">{review.reviewTitle}</h5>
            <p className="line-clamp-2 text-xs md:text-sm md:line-clamp-3 tracking-wide md:leading-6 break-all">
              {review.reviewContent}
            </p>
            <div className="flex my-2 justify-end">
              <p className="px-4 rounded-3xl bg-blue-form text-white text-xs md:text-sm">{review.reviewer}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}