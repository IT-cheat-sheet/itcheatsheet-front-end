import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { Link } from "react-router-dom";
import { getSpecificPdf } from "../../../core/service/getSheet";

export default function SheetThumb({id, fileName, link}) {
  const [file, setFile] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const ref = useRef();

  useEffect(() => {
    setFile(null);
    setIsLoaded(false);

    (async function() {
      try {
        const res = await getSpecificPdf(id);
      
        if(res.status === 200){
          var reader = new FileReader();
          reader.onload = (e) => {
            setFile(e.target.result);
          };
          reader.readAsDataURL(res.data);
        }
      } catch (err) {
        console.log(err);
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
    <div className="py-3 lg:px-4 lg:py-3 xl:px-8 xl:py-4">
      <Link key={id} to={`/sheets/${id}`}>
        <div className="p-2 cursor-pointer" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
          <div ref={ref} className={classNames("w-full h-auto rounded-lg transition duration-200 transform flex justify-center items-center text-center",
          {"bg-white text-violet-hover shadow-halo-sm overflow-hidden" : !file},
          {"scale-105" : isHover}
          )}>
              {file ?
                <div className={classNames("rounded-lg", {"shadow-halo-sm overflow-hidden" : isLoaded})}>
                  <Document file={file} loading={
                    <div className="text-violet-hover">
                      <span className="material-icons-round md:text-iconLoad text-3xl spin">hourglass_top</span>
                      <div>Loading... Please Wait</div>
                    </div>
                  }>
                    <Page pageNumber={1} loading={
                      <div className="text-violet-hover">
                        <span className="material-icons-round md:text-iconLoad text-3xl spin">hourglass_top</span>
                        <div>Loading... Please Wait</div>
                      </div>
                    }
                    onLoadSuccess={() => setIsLoaded(true)} renderTextLayer={false} renderAnnotationLayer={false} />
                  </Document>
                </div> :
                link ?
                  <span className="material-icons md:text-icon text-9xl w-full transform -rotate-45">link</span> :
                  <span className="material-icons md:text-icon text-9xl w-full">subject</span>
              }
          </div>
          <div className="md:hidden text-lg font-semibold uppercase text-gray-header text-center mt-5 truncate">{fileName}</div>
          <div className="hidden md:block body-base uppercase text-gray-header text-center mt-5 truncate">{fileName}</div>
        </div>
      </Link>
    </div>
  )
}