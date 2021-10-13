import React from 'react'
// import { Link } from 'react-router-dom'

export default function RecommendedBlock() {
  const image = "sitMusic7-01.png"
  return (
    // <Link to="/">
      <div className="w-full grid grid-cols-4 text-blue-body bg-lightblue-bg rounded-lg h-44 cursor-pointer hover:shadow-xl">
        {image ?
          <div>
            <img src={image} className="h-44 object-cover rounded-l-lg" />
          </div>
          : <></>
        }
        <div className={`pl-4 table mr-4 ${image === "" ? "col-span-4" : "col-span-3"}`}>
          <div className="table-cell align-middle">
            <h5 className="body-base">Thread's name</h5>
            <p className="line-clamp-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <div className="flex my-2 justify-end">
              <p className="uppercase px-6 rounded-3xl bg-blue-form text-white">post owner</p>
              <p className="ml-2.5 text-blue-page">POST ID</p>
            </div>
          </div>
        </div>
      </div>
    // </Link>
  )
}
