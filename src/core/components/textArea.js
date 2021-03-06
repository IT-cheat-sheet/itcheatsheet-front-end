import React, { useState } from 'react'

export default function TextArea({page, textAreaLabel, value, setValue, placeholder, errorText}) {
  const [textAreaValue, setTextAreaValue] = useState(value ? value : "");

  const updateValue = (value) => {
    setTextAreaValue(value);
    setValue(value);
  }

  const ringHoverColor = "hover:ring-" + (page === 'sheet' ? 'purple' : page === 'review' ? 'blue' : 'gray') + "-form";
  const ringFocusColor = "focus:ring-" + (page === 'sheet' ? 'purple' : page === 'review' ? 'blue' : 'gray') + "-formHover";

  return (
    <div className="body-sm w-full flex flex-col items-start space-y-2">
      <p className={`uppercase body-sm ${page === 'sheet' ? 'text-violet-bubbleText' : (page === 'review') ? 'text-blue-body' : "text-black"}`}>{textAreaLabel}</p>
      <textarea 
        id="textAreaContent" 
        name="textAreaContent" 
        className={`resize-none w-full h-36 overflow-y-auto px-6 py-3 input ${ringHoverColor} ${ringFocusColor} ${page === 'sheet' ? 'placeholder-violet-bubbleHover' : page === 'review' ? 'placeholder-lightblue-lighter' : 'placeholder-gray-disabled'} text-gray-mailbox rounded-lg`} 
        placeholder={placeholder}
        onChange={e => updateValue(e.target.value)}
        value={textAreaValue}
        >
      </textarea>
      <p className="h-4 text-red-button" style={{ fontSize: "10px" }}>{errorText}</p>
    </div>
  )
}
