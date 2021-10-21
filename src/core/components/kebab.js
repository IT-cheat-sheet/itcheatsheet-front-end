import React, { useState } from 'react'

export default function Kebab({ page }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={`text-right relative w-27 md:w-36 lg:w-64 ${page === 'sheet' ? 'text-violet-hover' : 'text-blue-body'}`}>
      <span className="material-icons cursor-pointer p-1" onClick={() => setToggle(!toggle)}>more_vert</span>
      {toggle
        ? <div className={`uppercase w-27 md:w-36 lg:w-60 text-center absolute top-0 right-7 text-xs md:text-sm lg:text-xl rounded-lg ${page === 'sheet' ? 'bg-violet-bubble' : 'bg-lightblue-lighter'}`}>
          <p className={`py-2 lg:py-5 cursor-pointer rounded-t-lg flex justify-center items-center ${page === 'sheet' ? 'hover:bg-violet-bubbleHover' : 'hover:bg-lightblue-light'}`} onClick={() => alert('share modal open')}>
            share
            <span className="material-icons ml-1.5 text-xs md:text-base lg:text-xl">share</span>
          </p>
          <hr className={`opacity-100 ${page === 'sheet' ? 'border-violet-hover' : 'bg-lightblue-light'}`} />
          <p className={`py-2 lg:py-5 cursor-pointer rounded-b-lg flex justify-center items-center ${page === 'sheet' ? 'hover:bg-violet-bubbleHover' : 'hover:bg-lightblue-light'}`} onClick={() => alert('suggest modal open')}>
            suggestion
            <span className="material-icons ml-1.5 text-xs md:text-base lg:text-xl">edit</span>
          </p>
        </div>
        : <></>}
    </div>
  )
}