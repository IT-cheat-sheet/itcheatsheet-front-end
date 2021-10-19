import React, { useState } from 'react'

export default function Kebab({ page }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={`text-right relative w-64 ${page === 'sheet' ? 'text-violet-hover' : 'text-blue-body'}`}>
      <span className="material-icons cursor-pointer p-1" onClick={() => setToggle(!toggle)}>more_vert</span>
      {toggle
        ? <div className={`uppercase w-60 text-center absolute top-0 right-7 text-xl rounded-lg ${page === 'sheet' ? 'bg-violet-bubble' : 'bg-lightblue-light'}`}>
          <p className={`py-5 cursor-pointer rounded-t-lg flex justify-center items-center ${page === 'sheet' ? 'hover:bg-violet-bubbleHover' : 'hover:bg-lightblue-hover'}`} onClick={() => alert('share modal open')}>
            share
            <span className="material-icons ml-1.5">share</span>
          </p>
          <hr className={`opacity-100 ${page === 'sheet' ? 'border-violet-hover' : 'bg-lightblue-hover'}`} />
          <p className={`py-5 cursor-pointer rounded-b-lg flex justify-center items-center ${page === 'sheet' ? 'hover:bg-violet-bubbleHover' : 'hover:bg-lightblue-hover'}`} onClick={() => alert('suggest modal open')}>
            suggestion
            <span className="material-icons ml-1.5">edit</span>
          </p>
        </div>
        : <></>}
    </div>
  )
}