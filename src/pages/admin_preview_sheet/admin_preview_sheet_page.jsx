import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router';
import AdminNavbar from '../../core/components/adminNavbar';
import { adminPreviewSheetContext } from './admin_preview_sheet_context';
import { Observer } from "mobx-react-lite";
import Button from '../../core/components/button'

export default function AdminPreviewSheet() {
  const params = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const context = useContext(adminPreviewSheetContext);
  const history = useHistory();

  useEffect(() => {
    context.prepareSheet(params.id);
    context.preparePdf(params.id);
    context.setValue("history", history);
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
              <div className="grid grid-cols-12 gap-5 mt-5">
                <div className="col-span-8"></div>
                <div className="col-span-2">
                  <Button size="sm" color="yellow">EDIT</Button>
                </div>
                <div className="col-span-2">
                  <Button size="sm" color="red" onClick={() => setOpenDeleteModal(true)}>DELETE</Button>
                </div>
              </div>
              {
                openDeleteModal ?
                  <>
                    <div
                      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-60 outline-none focus:outline-none mx-4"
                    >
                      <div className="relative w-1/3 my-6 mx-auto max-w-3xl text-left">
                        <div className="flex justify-between">
                          <h3 className="uppercase text-white text-4xl font-bold">CONFIRM DELETE</h3>
                          <span className="material-icons text-white text-4xl cursor-pointer" onClick={() => setOpenDeleteModal(false)}>cancel</span>
                        </div>
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-footer outline-none focus:outline-none mt-5">
                          <div className="relative p-6 flex-auto mx-6 text-center text-black">
                            <p className="text-2xl text-gray-subheader font-bold">ARE YOU SURE TO DELETE?</p>
                            <div className="mt-5">
                              <Button color="red" size="sm" onClick={() => context.delSheet(context.sheet.summaryPostId,context.token)}>DELETE</Button>
                            </div>
                            <p className="text-md text-red-button mt-2">Delete this sheet will also delete all reports of this sheet. </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-50 bg-black"></div>
                  </>
                  : <></>
              }
            </div>
            : <></>}
        </>
      )}


    </Observer>
  )
}
