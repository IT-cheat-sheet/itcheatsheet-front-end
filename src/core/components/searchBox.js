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
        {'bg-violet-bubbleHover hover:bg-violet-pill text-violet-bubbleText' : page === "sheet"},
        {'bg-lightblue-button hover:bg-lightblue-hover text-lightblue-hover' : page === "admin"})}>None</div>
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
          {'bg-violet-bubbleHover hover:bg-violet-pill text-violet-bubbleText' : page === "sheet"},
          {'bg-lightblue-button hover:bg-lightblue-hover text-lightblue-hover' : page === "admin"}
          )
          }>{option.key}</div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className={classNames("hidden md:grid grid-cols-12 gap-5 rounded-lg body-base",
      {"bg-lightblue-bg" : page === "review",},
      {"bg-violet-bubbleHover" : page === "sheet"},
      {"px-6 py-4" : page !== 'admin'}
      )}>
        <div className={`${page === 'admin' ? 'col-span-3' : 'col-span-2'} relative dropdown`}>
          <Button color={page === "review" ? "blue" : page === "sheet" ? "purple" : "lightblue"} size="sm" children="SORT BY" onClick={() => setToggle(!toggle)} />
          {toggle ? <Dropdown /> : <></>}
        </div>
        <div className={page === 'admin' ? 'col-span-6 col-start-5' : 'col-span-8'}><input className={classNames("w-full h-full rounded-lg px-4 focus:outline-none",
        {"text-purple-hover": page === "sheet"},
        {"text-blue-body": page === "review"},
        {"text-gray-mailbox bg-gray-form bg-opacity-50": page === "admin"})} onChange={(e) => setSearchWord(e.target.value)} /></div>
        <div className="col-span-2"><Button color={page === "sheet" ? "purple" : "blue"} size="sm" children={<span className="material-icons text-4xl">search</span>} onClick={() => onSearch(searchWord)} /></div>
      </div>
      <div className="grid md:hidden grid-cols-12 gap-x-3 body-base">
        <div className="col-span-8"><input className={classNames("w-full h-full rounded-lg px-4 focus:outline-none",
        {"text-purple-hover" : page === "sheet"},
        {"text-blue-body bg-lightblue-bg" : page === "review"})} onChange={(e) => setSearchWord(e.target.value)} /></div>
        <div className="col-span-2"><Button color={page === "review" ? "blue" : "purple"} size="sm" children={<span className="material-icons text-3xl">search</span>} onClick={() => onSearch(searchWord)} /></div>
        <div className="col-span-2 relative dropdown">
          <Button color={page === "review" ? "blue" : "purple"} size="sm" children={<span className="material-icons text-3xl">filter_list</span>} onClick={() => setToggle(!toggle)} />
          {toggle ? <Dropdown /> : <></>}
        </div>
      </div>
    </div>
  )
}