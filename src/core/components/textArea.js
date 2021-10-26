import React, { useState } from 'react'

export default function TextArea({page, textAreaLabel, value, setValue}) {
  const [textAreaValue, setTextAreaValue] = useState(value ? value : "");

  const updateValue = (value) => {
    setTextAreaValue(value);
    setValue(value);
  }

  const ringHoverColor = "hover:ring-" + (page === 'sheet' ? 'purple' : page === 'review' ? 'blue' : 'gray') + "-form";
  const ringFocusColor = "focus:ring-" + (page === 'sheet' ? 'purple' : page === 'review' ? 'blue' : 'gray') + "-formHover";

  return (
    <div className="body-sm">
      <label className={`uppercase mb-5 ${page === 'sheet' ? 'text-violet-pill' : (page === 'review') ? 'text-blue-body' : "text-black"}`} for="textAreaContent">{textAreaLabel}</label>
      <br/>
      <textarea 
        id="textAreaContent" 
        name="textAreaContent" 
        className={`resize-none w-full h-60 mt-5 input ${ringHoverColor} ${ringFocusColor} placeholder-gray-disabled text-gray-mailbox rounded-lg py-2 px-4`} 
        placeholder="Please text politely :)"
        onChange={e => updateValue(e.target.value)}
        value={textAreaValue}
        >

      </textarea>
    </div>
  )
}
