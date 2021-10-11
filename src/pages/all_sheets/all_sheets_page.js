import React from "react";
import SearchBox from "../../core/components/searchBox";
import SheetThumb from "./sheet_thumb";

export default function AllSheets() {
  return (
    <div className="mx-44">
      <div className="header-popup text-violet-sheet mb-5">ALL SHEET</div>
      <div className="p-14 rounded-lg bg-violet-bg">
        <SearchBox page="sheet" />
        <div className="grid grid-cols-4">
          <SheetThumb url="62130500023_A1.pdf" fileName="File Name"/>
          <SheetThumb url="62130500023_A1.pdf" fileName="File Name"/>
          <SheetThumb url="62130500023_A1.pdf" fileName="File Name"/>
          <SheetThumb url="62130500023_A1.pdf" fileName="File Name"/>
          <SheetThumb url="62130500023_A1.pdf" fileName="File Name"/>
        </div>
      </div>
    </div>
  )
}