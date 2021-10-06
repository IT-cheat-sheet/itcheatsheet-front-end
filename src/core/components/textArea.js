import React from 'react'

export default function textArea(props) {
  return (
    <div className={`${props.page === 'sheet' ? 'text-violet-pill' : 'text-blue-body'}`}>
      <label className="uppercase text-2xl" for="textAreaContent">{props.textAreaLabel}</label>
      <br />
      <textarea 
        id="textAreaContent" 
        name="textAreaContent" 
        className={`resize-none w-3/5 h-60 mt-5 rounded-lg py-2 px-4
        ${props.page === 'sheet' ? 'placeholder-violet-pill' : 'placeholder-blue-body'}`} 
        placeholder="Please text politely :)">  
      </textarea>
    </div>
  )
}
