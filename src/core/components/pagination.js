import React from 'react'
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

export default function Pagination({ page, current, total, url }) {
  const history = useHistory();

  const LoopPage = ({ totalPages }) => {
    const pages = [];
    const half = totalPages / 2;
    const start = current < (Math.floor(half) + 1) ? 1 : current > total - (Math.floor(half) - 1) ? total - (totalPages - 1) : current - Math.floor(half) ;
    const limit = current < (Math.floor(half) + 1) ? totalPages : current > total - (Math.floor(half) - 1) ? total : current + (Math.ceil(half) - 1) ;

    for(let i = 1; i <= total; i++){
      if(i >= start && i <= limit){
        pages.push(
          <button key={i} className={classNames("font-bold mx-4",
          {"text-blue-button" : current === i && page === "review",},
          {"text-violet-page" : current === i && page === "sheet"})} onClick={() => pageHop(i)}>{i}</button>
        )
      }
    }
    return pages;
  }

  const pageHop = (nextRoute) => {
    if(nextRoute === 1){
      history.push(url);
    } else {
      history.push(`${url}?page=${nextRoute}`);
    }
  }

  return (
    <div>
      <div className="text-lg md:text-2xl w-full flex justify-center">
        <div className="hidden md:flex text-gray-header w-full justify-around">
          <button className={classNames("font-bold mx-4", {"text-gray-disabled cursor-default": current === 1})} disabled={current === 1} onClick={() => pageHop(1)}>&lt;&lt;</button>
          <button className={classNames("font-bold mx-4", {"text-gray-disabled cursor-default": current === 1})} disabled={current === 1} onClick={() => pageHop(current - 1)}>&lt;</button>
          <LoopPage totalPages={10}/>
          <button className={classNames("font-bold mx-4", {"text-gray-disabled cursor-default": current === total})} disabled={current === total} onClick={() => pageHop(current + 1)}>&gt;</button>
          <button className={classNames("font-bold mx-4", {"text-gray-disabled cursor-default": current === total})} disabled={current === total} onClick={() => pageHop(total)}>&gt;&gt;</button>
        </div>
        <div className="md:hidden text-gray-header flex w-full justify-around">
          <button className={classNames("font-bold p-3 rounded-lg",
          {"cursor-default": current === 1},
          {"bg-purple-form bg-opacity-40 text-violet-sheet" : page === "sheet"},
          {"bg-blue-button text-white" : page === "review"})} disabled={current === 1} onClick={() => pageHop(current - 1)}><span className="material-icons font-bold block">chevron_left</span></button>
          <LoopPage totalPages={4}/>
          <button className={classNames("font-bold p-3 rounded-lg",
          {"cursor-default": current === 1},
          {"bg-purple-form bg-opacity-40 text-violet-sheet" : page === "sheet"},
          {"bg-blue-button text-white" : page === "review"})} disabled={current === total} onClick={() => pageHop(current + 1)}><span className="material-icons font-bold block">chevron_right</span></button>
        </div>
      </div>
    </div>
  )
}
