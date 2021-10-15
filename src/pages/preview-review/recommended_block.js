import React from 'react'

export default function RecommendedBlock(props) {
  return (
      <div className="w-full grid grid-cols-4 text-blue-body bg-lightblue-bg rounded-lg h-44 cursor-pointer hover:shadow-xl">
        {props.image ?
          <div>
            <img src={props.image} className="h-44 object-cover rounded-l-lg" alt="review"/>
          </div>
          : <></>
        }
        <div className={`pl-4 table mr-4 ${props.image === "" ? "col-span-4" : "col-span-3"}`}>
          <div className="table-cell align-middle">
            <h5 className="body-base">{props.reviewTitle}</h5>
            <p className="line-clamp-3">
              {props.reviewContent}
            </p>
            <div className="flex my-2 justify-end">
              <p className="uppercase px-6 rounded-3xl bg-blue-form text-white">{props.reviewer}</p>
              <p className="ml-2.5 text-blue-page">{props.reviewId}</p>
            </div>
          </div>
        </div>
      </div>
  )
}
