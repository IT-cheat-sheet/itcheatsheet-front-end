import React, { useEffect, useState } from 'react';

const Dropdown = ({label, options, page, setValue}) => {
  const [display, setDisplay] = useState('none')
  const [toggle, setToggle] = useState(false);

  const updateValue = (name, value) => {
    setDisplay(name);
    setValue(value);
  }

  useEffect(() => {
    const closeDropdown = (e) => {
      if(e.target.id !== 'dropdown'){
        setToggle(false);
      }
    }
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    }
  })

  const placeholderColor = page === 'sheet' ? 'text-violet-bubbleHover' : page === 'review' ? 'text-lightblue-lighter' : 'text-gray-disabled';
  const ringHoverColor = "hover:ring-" + (page === 'sheet' ? 'purple' : page === 'review' ? 'blue' : 'gray') + "-form";
  const ringFocusColor = "focus:ring-" + (page === 'sheet' ? 'purple' : page === 'review' ? 'blue' : 'gray') + "-formHover";
  const labelColor = page === 'sheet' ? 'text-violet-pill' : page === 'review' ? 'text-blue-body' : 'text-gray-mailbox';

  return (
    <div>
      <label className={`uppercase body-sm mb-5 ${labelColor}`} htmlFor="dropdown">{label}</label>
      <div id="dropdown" onClick={() => setToggle(!toggle)} className={`rounded-lg h-12 body-sm py-2 px-4 bg-white w-52 cursor-pointer relative input ${ringFocusColor} ${ringHoverColor}`}>
        <div className={`inline-block ${display === 'none' ? placeholderColor : 'text-gray-mailbox'}`}>{display}</div>
        <div className={`absolute right-0 top-0 inline-block ${labelColor}`}><span className="text-5xl material-icons">arrow_drop_down</span></div>
      </div>
      {toggle ?
      <div className={`shadow-xl absolute rounded-lg ${labelColor}`}>
        {options.map((option, index) => (
          <div
          onClick={() => {updateValue(option.name, option.value)
            setToggle(false);}}
          className={`h-12 w-52 bg-white py-2 px-4 body-sm cursor-pointer
          ${index === options.length - 1 ? 'rounded-b-lg' : 'border-b-2 border-gray-disabled'}
          ${index === 0 ? 'rounded-t-lg' : ''}
          ${labelColor}`}>{option.name}</div>
        ))}
      </div>
      : <></>}
    </div>
  )
} 

export default Dropdown;