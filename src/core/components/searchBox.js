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
    const closeDropdown = (e) => {
      if(!e.target.classList.contains('dropdown') && e.target.innerText !== 'SORT BY' && e.target.innerText !== 'filter_list'){
        setToggle(false);
      }
    }
    document.addEventListener('keypress', searchEnter);
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('keypress', searchEnter);
      document.removeEventListener('click', closeDropdown);
    }
  }, [onSearch, searchWord])

  const Dropdown = () => {
    return (
      <div className={`absolute top-14 shadow-halo -left-36 md:left-0 rounded-lg z-20`}>
        <div
          onClick={() => {
            onFilter('');
            setToggle(false);
          }}
          className={classNames("dropdown w-48 py-3 px-4 body-base cursor-pointer hover:text-white rounded-t-lg",
        {'bg-lightblue-lighter hover:bg-blue-form text-blue-body' : page === "review"},
        {'bg-violet-bubbleHover hover:bg-violet-pill text-violet-bubbleText' : page === "sheet"})}>None</div>
        {options.map((option, index) => (
          <div
          key={index}
          onClick={() => {
            onFilter(option.value);
            setToggle(false);
          }}
          className={classNames("dropdown w-48 py-3 px-4 body-base cursor-pointer  hover:text-white",
          {'rounded-b-lg' : index === options.length - 1},
          {'bg-lightblue-lighter hover:bg-blue-form text-blue-body' : page === "review"},
          {'bg-violet-bubbleHover hover:bg-violet-pill text-violet-bubbleText' : page === "sheet"}
          )
          }>{option.key}</div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className={classNames("hidden md:grid grid-cols-12 gap-5 px-6 py-4 rounded-lg body-base",
      {"bg-lightblue-bg" : page === "review",},
      {"bg-violet-bubbleHover" : page === "sheet"}
      )}>
        <div className="col-span-2 relative dropdown" onClick={() => setToggle(!toggle)}>
          <Button color={page === "review" ? "blue" : "purple"} size="sm" children="SORT BY" />
          {toggle ? <Dropdown /> : <></>}
        </div>
        <div className="col-span-8"><input className="w-full h-full rounded-lg px-4 text-purple-hover focus:outline-none" onChange={(e) => setSearchWord(e.target.value)} /></div>
        <div className="col-span-2" onClick={() => onSearch(searchWord)}><Button color={page === "review" ? "blue" : "purple"} size="sm" children={<span className="material-icons text-4xl">search</span>} /></div>
      </div>
      <div className="grid md:hidden grid-cols-12 gap-x-3 body-base">
        <div className="col-span-8"><input className="w-full h-full rounded-lg px-4 text-purple-hover focus:outline-none" onChange={(e) => setSearchWord(e.target.value)} /></div>
        <div className="col-span-2" onClick={() => onSearch(searchWord)}><Button color={page === "review" ? "blue" : "purple"} size="sm" children={<span className="material-icons text-3xl">search</span>} /></div>
        <div className="col-span-2 relative dropdown" onClick={() => setToggle(!toggle)}>
          <Button color={page === "review" ? "blue" : "purple"} size="sm" children={<span className="material-icons text-3xl">filter_list</span>} />
          {toggle ? <Dropdown /> : <></>}
        </div>
      </div>
    </div>
  )
}