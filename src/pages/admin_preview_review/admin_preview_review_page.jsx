import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router';
import AdminNavbar from '../../core/components/adminNavbar';
import { adminPreviewReviewContext } from './admin_preview_review_context';
import { Observer } from "mobx-react-lite";
import Button from '../../core/components/button'
import ConfirmModal from '../../core/components/comfirmModal';

export default function AdminPreviewReview() {
  const params = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const context = useContext(adminPreviewReviewContext);
  const history = useHistory();

  useEffect(() => {
    context.prepareReview(params.id);
    context.prepareReviewImage(params.id);
    context.setValue("history", history);
    document.title = "ITCheatSheet-Report Review "+params.id;
  }, [])

  return (
    <Observer>
      {() => (
        <>
          <AdminNavbar />
          {context.isLoad ?
            <div className="mx-36 mb-12 mt-5">
              <div className="flex">
                <h2 className="header-secondary text-blue-body">{context.review.reviewTitle}</h2>
              </div>
              <div className="flex my-2">
                <p className="px-6 rounded-3xl bg-blue-form text-white">{context.review.reviewer}</p>
                <p className="ml-2.5 text-blue-page">{context.review.reviewId}</p>
              </div>
              <div className="bg-lightblue-bg rounded-lg mt-5 px-12 py-12">
                <p className="text-2xl text-blue-body mb-5">{context.review.reviewContent}</p>
                {
                  context.image ?
                    <img src={context.image} className="mt-5 md:w-4/6 md:mx-auto rounded-lg" alt="review" />
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
                onButtonClick={() => context.delSheet(context.sheet.summaryPostId, context.token)}
                onClose={() => setOpenDeleteModal(false)}
                label="confirm delete"
                buttonText="delete"
                header="are you sure you want to delete?"
                desc="Delete this sheet will also delete all reports of this sheet."
                buttonColor="red" />
            </div>
            : <></>}
        </>
      )}


    </Observer>
  )
}
