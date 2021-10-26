import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router';
import AdminNavbar from '../../core/components/adminNavbar';
import { adminPreviewReviewContext } from './admin_preview_review_context';
import { Observer } from "mobx-react-lite";
import Button from '../../core/components/button'

export default function AdminPreviewReview() {
  const params = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const context = useContext(adminPreviewReviewContext);
  const history = useHistory();

  useEffect(() => {
    context.prepareReview(params.id);
    context.prepareReviewImage(params.id);
    context.setValue("history", history);
  }, [])

  return (
    <Observer>
      {() => (
        <>
          <AdminNavbar />
          {context.isLoad ?
            <div className="mx-36 mb-12">
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
                              <Button color="red" size="sm" onClick={() => context.delReview(context.review.reviewId, context.token)}>DELETE</Button>
                            </div>
                            <p className="text-md text-red-button mt-2">Delete this review will also delete all reports of this review. </p>
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
