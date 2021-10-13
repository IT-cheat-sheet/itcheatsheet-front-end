import React from 'react'
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

export default function Pagination({ page, current, total, url }) {
  const history = useHistory();

  const LoopPage = () => {
    const pages = [];
    for(let i = 1; i <= total; i++){
      pages.push(
        <button className={classNames("font-bold mx-4",
        {"text-blue-button" : current === i && page === "review",},
        {"text-violet-page" : current === i && page === "sheet"})} onClick={() => pageHop(i)}>{i}</button>
      )
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
    <div className="text-gray-header body-base">
      <button className="font-bold mx-4" disabled={current === 1} onClick={() => pageHop(1)}>&lt;&lt;</button>
      <button className="font-bold mx-4" disabled={current === 1} onClick={() => pageHop(current - 1)}>&lt;</button>
      <LoopPage />
      <button className="font-bold mx-4" disabled={current === total} onClick={() => pageHop(current + 1)}>&gt;</button>
      <button className="font-bold mx-4" disabled={current === total} onClick={() => pageHop(total)}>&gt;&gt;</button>
    </div>
  )
}
