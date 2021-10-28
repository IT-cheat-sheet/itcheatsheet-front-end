import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router';
import AdminNavbar from '../../core/components/adminNavbar';
import { adminPreviewSheetContext } from './admin_preview_sheet_context';
import { Observer } from "mobx-react-lite";
import Button from '../../core/components/button'
import ConfirmModal from '../../core/components/comfirmModal';
import _ from 'lodash';

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
          {context.isLoad &&
            <div className="mx-36 mb-12 my-5">
              <div className="flex">
                <h2 className="header-secondary text-violet-header">{context.sheet.summaryTitle}</h2>
                <p className="ml-3 text-purple-hover mt-8">{context.sheet.semester.semester}</p>
              </div>
              <div className="flex my-2">
                <p className="px-6 rounded-3xl bg-violet-pill text-white">{context.sheet.posterName}</p>
                <p className="ml-2.5 text-purple-hover">{context.sheet.subject.subjectId + ' ' + _.startCase(context.sheet.subject.subjectName.toLowerCase())}</p>
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
                        {context.sheet.subject.subjectId + '-' + context.sheet.summaryPostId + '.pdf'}
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
              <ConfirmModal
              isOpen={openDeleteModal}
              onButtonClick={() => context.delSheet(context.sheet.summaryPostId,context.token)}
              onClose={() => setOpenDeleteModal(false)}
              label="confirm delete"
              buttonText="delete"
              header="are you sure you want to delete?"
              desc="Delete this sheet will also delete all reports of this sheet."
              buttonColor="red" />
            </div>}
        </>
      )}


    </Observer>
  )
}
