import React from 'react';

const InputText = ({label, placeholder, page, onChange}) => {
  const labelColor = page === 'sheet' ? 'text-violet-bubbleText' : 'text-blue-body';
  const placeholderColor = page === 'sheet' ? 'placeholder-violet-bubbleHover' : 'placeholder-lightblue-lighter';
  const ringHoverColor = "hover:ring-" + (page === 'sheet' ? 'purple' : 'blue') + "-form";
  const ringFocusColor = "focus:ring-" + (page === 'sheet' ? 'purple' : 'blue') + "-formHover";

  return (
    <div>
      <p className={`uppercase body-sm ${labelColor}`}>{label}</p>
      <input type="text" placeholder={placeholder} className={`rounded-lg h-12 body-sm mt-3 py-2 px-4 input text-gray-mailbox ${ringHoverColor} ${ringFocusColor} ${placeholderColor}`} onChange={onChange}/>
    </div>
  )
} 

export default InputText;