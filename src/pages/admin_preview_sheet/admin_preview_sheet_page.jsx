import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router';
import AdminNavbar from '../../core/components/adminNavbar';
import { adminPreviewSheetContext } from './admin_preview_sheet_context';
import { Observer } from "mobx-react-lite";
// import _ from "lodash";

export default function AdminPreviewSheet() {
  const params = useParams();
  const context = useContext(adminPreviewSheetContext);

  useEffect(() => {
    context.prepareSheet(params.id);
    context.preparePdf(params.id);
  }, [])
  return (
    <Observer>
      {() => (
        <>
          <AdminNavbar />
          {context.isLoad ?
            <div className="mx-36">
              <div className="flex">
                <h2 className="header-secondary text-violet-header">{context.sheet.summaryTitle}</h2>
                <p className="ml-3 text-purple-hover mt-8">{context.sheet.semester.semester}</p>
              </div>
              <div className="flex my-2">
                <p className="px-6 rounded-3xl bg-violet-pill text-white">{context.sheet.posterName}</p>
                <p className="ml-2.5 text-purple-hover">{context.sheet.summaryPostId}</p>
              </div>
              <div className="bg-violet-bg rounded-lg mt-5 px-12 py-12">
                <p className="text-2xl text-purple-hover mb-5">{context.sheet.summaryContent}</p>
                {
                  context.sheet.linkAttachment ?
                    <a className="text-violet-link text-2xl flex items-center" href={context.sheet.linkAttachment} target="_blank" rel="noreferrer">
                      <span className="material-icons transform -rotate-45 mr-2">link</span>
                      <span className="underline">{context.sheet.linkAttachment}</span>
                    </a> :
                    <></>
                }
                {
                  context.file ?
                    <div className="mt-10">
                      <a
                        href={`http://localhost:3000/summarypost/getFile/${params.id}`}
                        className="px-7 py-2 bg-violet-admin text-white rounded-full"
                        target="_blank"
                        rel="noreferrer">
                        {context.sheet.summaryPostId + '.pdf'}
                      </a>
                    </div>
                    : <></>
                }
              </div>
            </div>
            : <></>}
        </>
      )}


    </Observer>
  )
}
