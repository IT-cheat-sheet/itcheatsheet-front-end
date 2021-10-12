import classNames from "classnames";
import React, { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import './sheet_thumb.css'

export default function SheetThumb({ url, fileName}) {
  const [isHover, setIsHover] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (<div className="px-8 py-4">
    <div className="p-2 cursor-pointer" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <div className={classNames("w-full rounded-lg overflow-hidden transition duration-200 transform noselect",
      {"scale-105" : isHover},
      {"shadow-halo" : isLoaded})}>
        <Document file={url} onLoadSuccess={() => setIsLoaded(true)}>
          <Page pageNumber={1}/>
        </Document>
      </div>
      <div className="body-base uppercase text-gray-header text-center mt-5">{fileName}</div>
    </div>
  </div>)
}