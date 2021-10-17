import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Button from "./button";

export default function SearchBox({ page, options, onFilter, onSearch }) {
  const [searchWord, setSearchWord] = useState('');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const searchEnter = (e) => {
      if(e.code.includes('Enter')){
        onSearch(searchWord);
      }
    }
    document.addEventListener('keypress', searchEnter);
    return () => {
      document.removeEventListener('keypress', searchEnter);
    }
  }, [onSearch, searchWord])

  return (
    <div className={classNames("grid grid-cols-12 gap-5 px-6 py-4 rounded-lg body-base",
    {"bg-lightblue-bg" : page === "review",},
    {"bg-violet-bubbleHover" : page === "sheet"}
    )}>
      <div className="col-span-2 relative" onClick={() => setToggle(!toggle)}>
        <Button color={page === "review" ? "blue" : "purple"} size="sm" children="SORT BY" />
        {toggle ?
        <div className={`shadow-halo absolute top-14 rounded-lg z-20`}>
          <div
            onClick={() => {
              onFilter('');
              setToggle(false);
            }}
            className={`bg-lightblue-lighter w-48 py-3 px-4 body-base cursor-pointer hover:bg-blue-form text-blue-body hover:text-white rounded-t-lg`}>None</div>
          {options.map((option, index) => (
            <div
            onClick={() => {
              onFilter(option);
              setToggle(false);
            }}
            className={`bg-lightblue-lighter w-48 py-3 px-4 body-base cursor-pointer hover:bg-blue-form text-blue-body hover:text-white
            ${index === options.length - 1 ? 'rounded-b-lg' : ''}
            `}>{option}</div>
          ))}
        </div>
      : <></>}
      </div>
      <div className="col-span-8"><input className="w-full h-full rounded-lg px-4 focus:outline-none" onChange={(e) => setSearchWord(e.target.value)} /></div>
      <div className="col-span-2" onClick={() => onSearch(searchWord)}><Button color={page === "review" ? "blue" : "purple"} size="sm" children={<i className="fas fa-search" />} /></div>
    </div>
  )
}