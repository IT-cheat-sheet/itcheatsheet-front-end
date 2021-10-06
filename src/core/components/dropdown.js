import React, { useState } from 'react';

const Dropdown = ({label, options, page, setValue}) => {
  const [display, setDisplay] = useState('none')
  const [toggle, setToggle] = useState(false);

  const updateValue = (name, value) => {
    setDisplay(name);
    setValue(value);
  }

  const placeholderColor = page === 'sheet' ? 'text-violet-bubbleHover' : page === 'review' ? 'text-lightblue-lighter' : 'text-gray-disabled';
  const ringHoverColor = "hover:text-" + (page === 'sheet' ? 'purple' : page === 'review' ? 'blue' : 'gray') + "-form";
  const ringFocusColor = "focus:text-" + (page === 'sheet' ? 'purple' : page === 'review' ? 'blue' : 'gray') + "-formHover";
  const labelColor = page === 'sheet' ? 'text-violet-link' : page === 'review' ? 'text-blue-body' : 'text-gray-mailbox';

  return (
    <div>
      <div className={`uppercase body-base mb-5 ${labelColor}`}><label htmlFor="dropdown">{label}</label></div>
      <div id="dropdown" onClick={() => setToggle(!toggle)} className={`rounded-lg h-12 body-base py-2 px-4 bg-white w-52 cursor-pointer input ${ringHoverColor} ${ringFocusColor}`}>
        <div className={`w-11/12 inline-block ${display === 'none' ? placeholderColor : 'text-gray-mailbox'}`}>{display}</div>
        <div className={`w-1/12 inline-block ${labelColor}`}><i className="fas fa-caret-down" /></div>
      </div>
      {toggle ?
      <div className={`shadow-xl absolute rounded-lg ${labelColor}`}>
        {options.map((option, index) => (
          <div
          onClick={() => updateValue(option.name, option.value)}
          className={`h-12 w-52 bg-white py-2 px-4 body-base cursor-pointer
          ${index === options.length - 1 ? 'rounded-b-lg' : 'border-b-2 border-gray-disabled'}
          ${index === 0 ? 'rounded-t-lg' : ''}
          ${textColor}`}>{option.name}</div>
        ))}
      </div>
      : <></>}
    </div>
  )
} 

export default Dropdown;