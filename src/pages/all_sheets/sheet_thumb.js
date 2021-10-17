import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import './sheet_thumb.css'

export default function SheetThumb({id, fileName, link}) {
  const [file, setFile] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async function() {
      const res = await fetch(`http://localhost:3000/summarypost/getFile/${id}`);
      const data = await res.blob();
      
      if(res.status === 200){
          var reader = new FileReader();
          reader.onload = (e) => {
            setFile(e.target.result);
          };
          reader.readAsDataURL(data);
      } else {
        setFile(null);
      }
    })();

    const keepRatio = () => {
      const w = document.getElementById(`thumb_${id}`);
      w.style.height = `${(w.clientWidth / 254) * 358}px`;
    }

    keepRatio();

    window.addEventListener('resize', keepRatio);

    return () => {
      window.removeEventListener('resize', keepRatio);
    }
  }, [id])

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <div className="px-8 py-4" onClick={() => console.log(document.getElementById(`thumb_${id}`).clientHeight)}>
      <div className="p-2 cursor-pointer" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <div id={`thumb_${id}`} className={classNames("w-full rounded-lg overflow-hidden transition duration-200 transform flex justify-center items-center text-center bg-violet-bubbleHover text-violet-page",
        {"scale-105" : isHover},
        {"shadow-halo" : isLoaded})}>
          {file ?
          <Document file={file} onLoadSuccess={() => setIsLoaded(true)}>
            <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document> :
          link ?
          <i className="fas fa-link header-primary w-full" /> :
          <i className="fas fa-unlink header-primary w-full" />}
        </div>
        <div className="body-base uppercase text-gray-header text-center mt-5 truncate">{fileName}</div>
      </div>
    </div>
  )
}