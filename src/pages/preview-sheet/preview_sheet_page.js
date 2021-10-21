import React, { useState, useEffect } from 'react'
import Kebab from '../../core/components/kebab'
import Button from '../../core/components/button'
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router';
import Navbar from '../../core/components/navbar'
import Footer from '../../core/components/footer'

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
      <Navbar />
      {isLoad ?
        <div className={`px-4 pb-12 md:px-16 lg:px-20 xl:px-44 bg-violet-bg pt-24 lg:pt-0 md:bg-white md:grid md:gap-7 ${file ? "md:grid-cols-3" : ""}`}>
          <div className="md:hidden">
            <p className="text-xxs text-purple-hover">{sheet.summaryPost.semester.semester}</p>
            <div className="mt-2">
              <h1 className="text-2xl font-bold text-violet-header mr-4">{sheet.summaryPost.summaryTitle}</h1>
              <div className="float-right -mt-8">
                <Kebab page="sheet" />
              </div>
            </div>
            <div className="flex mt-1 mb-5">
              <p className="px-2 text-xxs rounded-3xl bg-violet-pill text-white">{sheet.summaryPost.posterName}</p>
              <p className="ml-4 text-purple-hover text-xxs">{sheet.summaryPost.summaryPostId}</p>
            </div>
          </div>
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
          <div className="mt-5 xl:mt-16 md:col-span-2">
            <div className="hidden md:block">
              <div className="flex">
                <h2 className="header-secondary text-violet-header">{sheet.summaryPost.summaryTitle}</h2>
                <p className="ml-3 text-purple-hover mt-9">{sheet.summaryPost.semester.semester}</p>
              </div>
              <div className="flex my-2">
                <p className="px-6 rounded-3xl bg-violet-pill text-white">{sheet.summaryPost.posterName}</p>
                <p className="ml-2.5 text-purple-hover">{sheet.summaryPost.summaryPostId}</p>
              </div>
            </div>
            <div className="text-xs md:mt-5 md:text-2xl">
              <div className="bg-violet-bg md:pt-5 pb-12">
                <div className="hidden md:flex md:justify-end md:mr-6">
                  <Kebab page="sheet" />
                </div>
                <div className="md:mx-14">
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
                  <div className="md:w-1/4 md:mb-12 text-center cursor-pointer mt-5 ml-auto text-white">
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
      <Footer />
    </div>
  )
}
