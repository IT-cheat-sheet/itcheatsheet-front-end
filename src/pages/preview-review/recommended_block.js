import React, { useEffect, useState } from 'react'

export default function RecommendedBlock({ review }) {
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
      <div 
        className={`w-full grid grid-cols-5 text-blue-body bg-lightblue-bg rounded-lg h-24 md:h-44 cursor-pointer transform transition duration-200 ${isHover ? "scale-105":""}`} 
        onMouseEnter={() => setIsHover(true)} 
        onMouseLeave={() => setIsHover(false)}
        >
        {image ?
          <div className="col-span-2">
            <img src={image} className="h-24 w-full md:h-44 object-cover rounded-l-lg" alt="review"/>
          </div>
          : <></>
        }
        <div className={`py-3 px-5 md:p-6 table ${image ? "col-span-3" : "col-span-5"}`}>
          <div className="table-cell align-middle">
            <h5 className="text-base md:text-2xl font-bold">{review.reviewTitle}</h5>
            <p className="line-clamp-2 text-xxs md:text-sm md:line-clamp-3 tracking-wide md:leading-6">
              {review.reviewContent}
            </p>
            <div className="flex my-2 justify-end">
              <p className="px-6 rounded-3xl bg-blue-form text-white text-xxs md:text-sm">{review.reviewer}</p>
              <p className="text-xxs ml-2 md:text-sm md:ml-2.5 text-blue-page">{review.reviewId}</p>
            </div>
          </div>
        </div>
      </div>
  )
}