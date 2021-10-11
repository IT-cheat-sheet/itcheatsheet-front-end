import classNames from "classnames";
import React from "react";
import Button from "./button";

export default function SearchBox({ page }) {
  return (
    <div className={classNames("grid grid-cols-12 gap-3 px-5 py-4 rounded-lg body-base",
    {"bg-lightblue-bg" : page === "review",},
    {"bg-violet-bubbleHover" : page === "sheet"}
    )}>
      <div className="col-span-2"><Button color={page === "review" ? "blue" : "purple"} size="sm" children="SORT BY" /></div>
      <div className="col-span-8"><input className="w-full h-full rounded-lg px-4 focus:outline-none" /></div>
      <div className="col-span-2"><Button color={page === "review" ? "blue" : "purple"} size="sm" children={<i className="fas fa-search" />} /></div>
    </div>
  )
}