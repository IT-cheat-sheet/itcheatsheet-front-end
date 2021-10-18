import React, { useEffect, useState } from 'react'

export default function RecommendedBlock({ review }) {
  const [image, setImage] = useState(null);

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
      <div className="w-full grid grid-cols-4 text-blue-body bg-lightblue-bg rounded-lg h-44 cursor-pointer hover:shadow-xl">
        {image ?
          <div>
            <img src={image} className="h-44 object-cover rounded-l-lg" alt="review"/>
          </div>
          : <></>
        }
        <div className={`pl-4 table mr-4 ${image ? "col-span-3" : "col-span-4"}`}>
          <div className="table-cell align-middle">
            <h5 className="body-base">{review.reviewTitle}</h5>
            <p className="line-clamp-3">
              {review.reviewContent}
            </p>
            <div className="flex my-2 justify-end">
              <p className="uppercase px-6 rounded-3xl bg-blue-form text-white">{review.reviewer}</p>
              <p className="ml-2.5 text-blue-page">{review.reviewId}</p>
            </div>
          </div>
        </div>
      </div>
  )
}
