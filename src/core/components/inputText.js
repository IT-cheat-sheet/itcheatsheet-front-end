import React from 'react';

const InputText = ({label, placeholder, page}) => {
  const labelColor = page === 'sheet' ? 'text-violet-pill' : 'text-blue-body';
  const placeholderColor = page === 'sheet' ? 'placeholder-violet-bubbleHover' : 'placeholder-lightblue-lighter';
  const ringHoverColor = "hover:text-" + (page === 'sheet' ? 'purple' : 'blue') + "-form";
  const ringFocusColor = "focus:text-" + (page === 'sheet' ? 'purple' : 'blue') + "-formHover";

  return (
    <div>
      <label className={`uppercase body-base mb-5 ${labelColor}`}>{label}</label>
      <input type="text" placeholder={placeholder} className={`rounded-lg h-12 body-base py-2 px-4 input text-gray-mailbox ${ringHoverColor} ${ringFocusColor} ${placeholderColor}`}/>
    </div>
  )
} 

export default InputText;