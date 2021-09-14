import React, { useState } from 'react';

const Dropdown = ({label, labelColor, options, textColor, placeholderColor}) => {
  const [display, setDisplay] = useState('none')
  // eslint-disable-next-line
  const [selectedValue, setSelectedValue] = useState('none')
  const [toggle, setToggle] = useState(false);

  const updateValue = (name, value) => {
    setDisplay(name);
    setSelectedValue(value);
  }

  return (
    <div>
      <div className={`uppercase text-2xl mb-5 ${labelColor}`}><label htmlFor="dropdown">{label}</label></div>
      <div id="dropdown" onClick={() => setToggle(!toggle)} className={`rounded-lg h-12 text-2xl py-2 px-4 bg-white w-52 cursor-pointer ${display === 'none' ? placeholderColor : textColor}`}>
        <div className="w-11/12 inline-block">{display}</div>
        <div className="w-1/12 inline-block"><i className="fas fa-caret-down" /></div>
      </div>
      {toggle ?
      <div className="shadow-xl absolute rounded-lg">
        {options.map((option, index) => (
          <div
          onClick={() => updateValue(option.name, option.value)}
          className={`h-12 w-52 bg-white py-2 px-4 text-2xl cursor-pointer
          ${index === options.length - 1 ? 'rounded-b-lg' : 'border-b-2 border-gray-300'}
          ${index === 0 ? 'rounded-t-lg' : ''}
          ${textColor}`}>{option.name}</div>
        ))}
      </div>
      : <></>}
    </div>
  )
} 

export default Dropdown;