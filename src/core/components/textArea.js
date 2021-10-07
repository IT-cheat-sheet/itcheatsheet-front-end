import React from 'react'

export default function textArea({page, textAreaLabel}) {
  const ringHoverColor = "hover:text-" + (page === 'sheet' ? 'purple' : 'blue') + "-form";
  const ringFocusColor = "focus:text-" + (page === 'sheet' ? 'purple' : 'blue') + "-formHover";

  return (
    <div>
      <label className={`uppercase body-base mb-5 ${page === 'sheet' ? 'text-violet-pill' : 'text-blue-body'}`} for="textAreaContent">{textAreaLabel}</label>
      <textarea 
        id="textAreaContent" 
        name="textAreaContent" 
        className={`resize-none w-3/5 h-60 mt-5 input ${ringHoverColor} ${ringFocusColor} rounded-lg py-2 px-4 text-gray-mailbox`} 
        placeholder="Please text politely :)">  
      </textarea>
    </div>
  )
}
