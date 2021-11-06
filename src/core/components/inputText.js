import React from 'react';

const InputText = ({label, placeholder, page, onChange, errorText}) => {
  const labelColor = page === 'sheet' ? 'text-violet-bubbleText' : 'text-blue-body';
  const placeholderColor = page === 'sheet' ? 'placeholder-violet-bubbleHover' : 'placeholder-lightblue-lighter';
  const ringHoverColor = "hover:ring-" + (page === 'sheet' ? 'purple' : 'blue') + "-form";
  const ringFocusColor = "focus:ring-" + (page === 'sheet' ? 'purple' : 'blue') + "-formHover";

  return (
    <div className="flex flex-col items-start space-y-2">
      <p className={`uppercase body-sm ${labelColor}`}>{label}</p>
      <input type="text" placeholder={placeholder} className={`rounded-lg h-12 body-sm py-2 px-4 input text-gray-mailbox ${ringHoverColor} ${ringFocusColor} ${placeholderColor}`} onChange={onChange}/>
      <p className="h-4 text-red-button" style={{ fontSize: "10px" }}>{errorText}</p>
    </div>
  )
} 

export default InputText;