import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { Link } from "react-router-dom";

export default function SheetThumb({id, fileName, link}) {
  const [file, setFile] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const ref = useRef();

  useEffect(() => {
    (async function() {
      try {
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
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    })();

    const keepRatio = () => {
      ref.current.style.height = `${(ref.current.clientWidth / 254) * 358}px`;
    }

    keepRatio();

    window.addEventListener('resize', keepRatio);

    return () => {
      window.removeEventListener('resize', keepRatio);
    }
  }, [id])

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <div className="py-3 md:px-8 md:py-4">
      <Link key={id} to={`/sheets/${id}`}>
        <div className="p-2 cursor-pointer" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
          <div ref={ref} className={classNames("w-full h-auto rounded-lg transition duration-200 transform flex justify-center items-center text-center",
          {"bg-violet-bubbleHover text-violet-page" : !file},
          {"scale-105" : isHover},
          {"shadow-halo-sm" : !file && isLoaded}
          )}>
              {file ?
                <div className={classNames("rounded-lg overflow-hidden", {"shadow-halo-sm" : isLoaded})}>
                  <Document file={file} onLoadSuccess={() => setIsLoaded(true)}>
                    <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
                  </Document>
                </div> :
              link ?
                <span className="material-icons text-9xl w-full transform -rotate-45">link</span> :
                <span className="material-icons text-9xl w-full">subject</span>
              }
          </div>
          <div className="md:hidden text-lg font-semibold uppercase text-gray-header text-center mt-5 truncate">{fileName}</div>
          <div className="hidden md:block body-base uppercase text-gray-header text-center mt-5 truncate">{fileName}</div>
        </div>
      </Link>
    </div>
  )
}