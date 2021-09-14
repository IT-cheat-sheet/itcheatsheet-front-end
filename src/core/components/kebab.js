import React, { useState } from 'react'

export default function Kebab(props) {
  const [toggle,setToggle] = useState(false);
  return (
    <div className="text-right relative w-64" style={{color: props.page === 'sheet' ? '#7A44BE' : '#416CAA'}}>
      <i className="fas fa-ellipsis-v text-2xl cursor-pointer" onClick={() => setToggle(!toggle)}></i>
      {toggle
      ? <div className="uppercase w-60 text-center absolute top-0 text-xl rounded-lg" 
          style={{backgroundColor: props.page === 'sheet' ? '#EDC9FE' : '#C3DCFF'}}>
        <p className="my-5">
          share 
          <i className="fas fa-share-alt ml-1.5"></i>
        </p>
        <hr className="opacity-100" style={{borderColor: props.page === 'sheet' ? '#E6B0FF' : '#79AFFF'}} />
        <p className="my-5">
          suggestion 
          <i className="fas fa-pen ml-1.5"></i>
        </p>
      </div>
      : <></>}
    </div>
  )
}
