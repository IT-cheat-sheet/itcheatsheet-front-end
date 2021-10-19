import React, { useState, useEffect } from 'react'
import Kebab from '../../core/components/kebab'
import Button from '../../core/components/button'
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router';

export default function PreviewSheet() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const params = useParams();
  const [sheet, setSheet] = useState([]);
  const [file, setFile] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    async function fetchSheet() {
      const res = await fetch(`http://localhost:3000/summarypost/get/${params.id}`)
      const data = await res.json();
      setSheet(data);
      setIsLoad(true);
    };
    async function fetchFile() {
      const res = await fetch(`http://localhost:3000/summarypost/getFile/${params.id}`);
      const data = await res.blob();

      if (res.status === 200) {
        var reader = new FileReader();
        reader.onload = (e) => {
          setFile(e.target.result);
        };
        reader.readAsDataURL(data);
      } else {
        setFile(null);
      }
    }

    fetchSheet();
    fetchFile();
  }, [params.id])

  return (
    <div>
      {isLoad ?
        <div className={`grid gap-7 pl-44 ${file ? "grid-cols-3" : ""}`}>
          {
            file ?
              <a href={`http://localhost:3000/summarypost/getFile/${params.id}`} target="_blank" rel="noreferrer">
                <div>
                  <Document
                    file={file}
                  >
                    <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
                  </Document>
                </div>
              </a>
              : <></>
          }
          <div className="mt-16 col-span-2">
            <div className="flex">
              <h2 className="header-secondary text-violet-header uppercase">{sheet.summaryPost.summaryTitle}</h2>
              <p className="ml-3 text-purple-hover mt-9">{sheet.summaryPost.semester.semester}</p>
            </div>
            <div className="flex my-2">
              <p className="px-6 rounded-3xl bg-violet-pill text-white">{sheet.summaryPost.posterName}</p>
              <p className="ml-2.5 text-purple-hover">{sheet.summaryPost.summaryPostId}</p>
            </div>
            <div className=" mr-44 mt-5 body-base">
              <div className="bg-violet-bg pt-5 pb-12">
                <div className="flex justify-end mr-6">
                  <Kebab page="sheet" />
                </div>
                <div className="mx-14">
                  <p className="text-violet-header">
                    {sheet.summaryPost.summaryContent}
                  </p>
                  <br />
                  {
                    sheet.summaryPost.linkAttachment ?
                      <a href={sheet.summaryPost.linkAttachment} className="text-violet-link underline" target="_blank" rel="noreferrer">
                        <i className="fas fa-link"></i>
                        <span className="ml-2">{sheet.summaryPost.linkAttachment}</span>
                      </a>
                      : <></>
                  }
                </div>
              </div>
              {
                file ?
                  <div className="w-1/4 text-center cursor-pointer mt-5 ml-auto text-white">
                    <a href={file} download={sheet.summaryPost.summaryTitle}>
                      <Button color="purple" size="sm">Download</Button>
                    </a>
                  </div>
                  : <></>
              }
            </div>
          </div>
        </div>
        : <></>
      }
    </div>
  )
}
