import React from 'react'
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

export default function Pagination({ page, current, total, url }) {
  const history = useHistory();

  const LoopPage = () => {
    const pages = [];
    const start = current < 7 ? 1 : current > total - 4 ? total - 9 : current - 5 ;
    const limit = current < 7 ? 10 : current > total - 4 ? total : current + 4 ;

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
    <div className="text-gray-header body-base w-full flex justify-center">
      <button className={classNames("font-bold mx-4", {"text-gray-disabled cursor-default": current === 1})} disabled={current === 1} onClick={() => pageHop(1)}>&lt;&lt;</button>
      <button className={classNames("font-bold mx-4", {"text-gray-disabled cursor-default": current === 1})} disabled={current === 1} onClick={() => pageHop(current - 1)}>&lt;</button>
      <LoopPage />
      <button className={classNames("font-bold mx-4", {"text-gray-disabled cursor-default": current === total})} disabled={current === total} onClick={() => pageHop(current + 1)}>&gt;</button>
      <button className={classNames("font-bold mx-4", {"text-gray-disabled cursor-default": current === total})} disabled={current === total} onClick={() => pageHop(total)}>&gt;&gt;</button>
    </div>
  )
}
