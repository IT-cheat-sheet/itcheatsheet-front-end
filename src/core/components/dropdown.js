import React, { useEffect, useState } from 'react';
import _ from 'lodash';

const Dropdown = ({label, options, page, setValue, errorText}) => {
  const [display, setDisplay] = useState('None')
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState('');

  const updateValue = (name, value) => {
    setDisplay(name);
    setValue(value);
    setSearch('');
  }

  useEffect(() => {
    const closeDropdown = (e) => {
      if(!e.target.classList.contains('dropdown')){
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
  const labelColor = page === 'sheet' ? 'text-violet-bubbleText' : page === 'review' ? 'text-blue-body' : 'text-gray-mailbox';

  return (
    <div className="flex flex-col w-full items-start space-y-2">
      <p className={`uppercase body-sm ${labelColor}`} htmlFor="dropdown">{label}</p>
      <div className={`dropdown rounded-lg h-12 body-sm bg-white w-full cursor-pointer relative input ${ringFocusColor} ${ringHoverColor}`}>
        <div onClick={() => setToggle(!toggle)} className="dropdown">
          <div className={`dropdown inline-block truncate w-3/4 py-2 px-4 ${display === 'None' ? placeholderColor : 'text-gray-mailbox'}`}>{display}</div>
          <div className={`absolute right-0 top-0 inline-block ${labelColor}`}><span className="dropdown text-5xl material-icons">arrow_drop_down</span></div>
        </div>
      {toggle &&
      <div className={`shadow-xl absolute z-60 rounded-lg w-full max-h-80 mt-1 overflow-y-scroll overflow-x-hidden innerTrack bg-white ${labelColor}`}>
        {label === 'subject' ?
        <div>
          <div
          onChange={(e) => setSearch(e.target.value)}
          className={`dropdown h-20 w-full bg-white py-2 px-4 body-sm border-b-2 border-gray-disabled ${labelColor}`}>
            <div className="text-center dropdown">Search for Subjects</div>
            <input className="dropdown rounded-button p-3 focus:outline-none w-full h-1/2 bg-violet-input" autoFocus />
          </div>
          {
            _.map(options, (option, index) => {
              if(option.name.toLowerCase().includes(search.toLowerCase())){
                return (
                  <div
                    key={index}
                    onClick={() => {
                      updateValue(option.name, option.value);
                      setToggle(false);
                    }}
                    className={`h-auto w-full bg-white py-2 px-4 text-sm cursor-pointer
                    ${index === options.length - 1 ? '' : 'border-b-2 border-gray-disabled'}
                    ${labelColor}`}>{option.name}</div>
                )
              }
              return <></>
            })
          }
        </div> :
        _.map(options, (option, index) => (
          <div
          key={index}
          onClick={() => {updateValue(option.name, option.value)
            setToggle(false);}}
          className={`h-12 w-full bg-white py-2 px-4 body-sm cursor-pointer
          ${index === options.length - 1 ? '' : 'border-b-2 border-gray-disabled'}
          ${labelColor}`}>{option.name}</div>
        ))}
      </div>}
      </div>
      <p className="h-4 text-red-button" style={{ fontSize: "10px" }}>{errorText}</p>
    </div>
  )
} 

export default Dropdown;