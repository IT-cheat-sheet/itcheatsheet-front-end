import React, { useState } from 'react'

export default function Kebab(props) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={`text-right relative w-64 ${props.page === 'sheet' ? 'text-violet-hover' : 'text-blue-body'}`}>
      <i className="fas fa-ellipsis-v text-2xl cursor-pointer" onClick={() => setToggle(!toggle)}></i>
      {toggle
        ? <div className={`uppercase w-60 text-center absolute top-0 text-xl rounded-lg ${props.page === 'sheet' ? 'bg-violet-bubble' : 'bg-lightblue-light'}`}>
          <p className={`py-5 cursor-pointer rounded-t-lg ${props.page === 'sheet' ? 'hover:bg-violet-bubbleHover' : 'hover:bg-lightblue-hover'}`} onClick={() => alert('share modal open')}>
            share
            <i className="fas fa-share-alt ml-1.5"></i>
          </p>
          <hr className={`opacity-100 ${props.page === 'sheet' ? 'border-violet-hover' : 'bg-lightblue-hover'}`} />
          <p className={`py-5 cursor-pointer rounded-b-lg ${props.page === 'sheet' ? 'hover:bg-violet-bubbleHover' : 'hover:bg-lightblue-hover'}`} onClick={() => alert('suggest modal open')}>
            suggestion
            <i className="fas fa-pen ml-1.5"></i>
          </p>
        </div>
        : <></>}
    </div>
  )
}
