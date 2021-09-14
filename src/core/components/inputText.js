import React from 'react';

const InputText = ({label, labelColor, textColor, placeholder, placeholderColor}) => {
  return (
    <div>
      <div className={`uppercase text-2xl mb-5 ${labelColor}`}>{label}</div>
      <input type="text" placeholder={placeholder} className={`rounded-lg h-12 text-2xl py-2 px-4 focus:outline-none ${textColor} ${placeholderColor}`}/>
    </div>
  )
} 

export default InputText;