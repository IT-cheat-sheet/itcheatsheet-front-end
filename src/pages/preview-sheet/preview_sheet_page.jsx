import React, { useState, useEffect, useContext } from 'react'
import Kebab from '../../core/components/kebab'
import Button from '../../core/components/button'
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router';
import Navbar from '../../core/components/navbar'
import Footer from '../../core/components/footer'
import { previewSheetContext } from './preview_sheet_context';

export default function PreviewSheet() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const params = useParams();
  const context = useContext(previewSheetContext);
  const [toggleSeeMore, setToggleSeeMore] = useState(false);
  const [exceed, setExceed] = useState(false);
  const [isPdfLoad, setIsPdfLoad] = useState(false);

  useEffect(() => {
    context.prepareSheet(params.id);
    context.preparePdf(params.id)
    if (context.isLoad) {
      const elm = document.getElementById('sheetContent');
      setExceed(elm.scrollHeight > elm.clientHeight);
    }
  }, [params])

  return (
    <div>
      <Navbar />
      {context.isLoad ?
        <div className={`px-4 pb-12 md:px-16 lg:px-20 xl:px-44 bg-violet-bg pt-24 lg:pt-0 md:bg-white ${context.file ? "md:grid-cols-12 md:grid md:gap-7" : ""}`}>
          <div className="col-span-5">
            <div className="md:hidden">
              <p className="text-xxs text-purple-hover">{context.sheet.summaryPost.semester.semester}</p>
              <div className="mt-2">
                <h1 className="text-2xl font-bold text-violet-header mr-4">{context.sheet.summaryPost.summaryTitle}</h1>
                <div className="float-right -mt-8">
                  <Kebab page="sheet" postId={context.sheet.summaryPost.summaryPostId} />
                </div>
              </div>
              <div className="flex mt-1 mb-5">
                <p className="px-2 text-xxs rounded-3xl bg-violet-pill text-white">{context.sheet.summaryPost.posterName}</p>
                <p className="ml-4 text-purple-hover text-xxs">{context.sheet.summaryPost.summaryPostId}</p>
              </div>
            </div>
            <div className={`rounded-button overflow-hidden ${context.file && 'mt-5'} ${isPdfLoad && 'shadow-halo'}`}>
              {
                context.file ?
                  <a id="pdfOpen" href={`http://localhost:3000/summarypost/getFile/${params.id}`} target="_blank" rel="noreferrer">
                    <div>
                      <Document file={context.file} onLoadSuccess={() => setIsPdfLoad(true)} loading={<div className="text-center my-5">Loading PDF...<br />Please Wait</div>}>
                        <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
                      </Document>
                    </div>
                  </a>
                  : <></>
              }
            </div>
            {context.file && (<div className="w-full text-center mt-2 text-purple-hover text-sm md:text-2xl">Click PDF to View File</div>)}

          </div>
          <div className="mt-5 xl:mt-7 md:col-span-7">
            <div className="hidden md:block">
              <div className="flex">
                <h2 className="header-secondary text-violet-header">{context.sheet.summaryPost.summaryTitle}</h2>
                <p className="ml-3 text-purple-hover mt-9">{context.sheet.summaryPost.semester.semester}</p>
              </div>
              <div className="flex my-2">
                <p className="px-6 rounded-3xl bg-violet-pill text-white">{context.sheet.summaryPost.posterName}</p>
                <p className="ml-2.5 text-purple-hover">{context.sheet.summaryPost.summaryPostId}</p>
              </div>
            </div>
            <div className="text-xs md:mt-5 md:text-2xl">
              <div className="bg-violet-bg md:pt-5 pb-12">
                <div className="hidden md:flex md:justify-end md:mr-6">
                  <Kebab page="sheet" postId={context.sheet.summaryPost.summaryPostId} />
                </div>
                <div className="md:mx-11">
                  <p id="sheetContent" className={`text-purple-hover ${toggleSeeMore ? "" : "line-clamp-6"} max-h-72 overflow-y-scroll innerTrack px-3`}>
                    {context.sheet.summaryPost.summaryContent}
                  </p>
                  {
                    toggleSeeMore || !exceed ?
                      <></>
                      : <div className="text-violet-link hover:text-violet-admin cursor-pointer px-3" onClick={() => setToggleSeeMore(true)}>see more</div>
                  }
                  {
                    context.sheet.summaryPost.linkAttachment ?
                      <a href={context.sheet.summaryPost.linkAttachment} className="text-violet-link mt-10 flex items-center" target="_blank" rel="noreferrer">
                        <span className="material-icons text-base md:text-3xl transform -rotate-45">link</span>
                        <span className="ml-1 md:ml-2 underline">{context.sheet.summaryPost.linkAttachment}</span>
                      </a>
                      : <></>
                  }
                </div>
              </div>
              {
                context.file ?
                  <div className="md:w-1/4 md:mb-12 text-center cursor-pointer mt-5 ml-auto text-white">
                    <a href={context.file} download={context.sheet.summaryPost.summaryPostId}>
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