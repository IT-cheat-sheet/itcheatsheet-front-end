import classNames from "classnames";
import React from "react";

export default function AdminThumb({ type, read, report }) {

  return (
    <div className="p-3 h-auto">
      <div
      className={classNames("text-gray-mailbox py-4 text-sm h-full rounded-button",
      {"bg-orange-bg hover:shadow-halo transition duration-200 cursor-pointer" : !read},
      {"bg-yellow-bg" : read})}>
        <div className="flex flex-col justify-center px-9 py-5">
          <div className={`w-full flex items-center gap-2 body-base font-bold mb-1 truncate`}>
            <div className="truncate">{type === 'sheet' ? report.summarypost.summaryTitle : report.reviews.reviewTitle}</div>
            <div className={classNames("inline-block w-3 h-3 rounded-full",
            {"bg-green-button" : read},
            {"bg-violet-header" : type === 'sheet' && !read},
            {"bg-blue-formHover" : type === 'review' && !read})}></div>
            <div className={classNames("px-3 rounded-3xl text-white w-max text-sm",
            {"bg-red-button" : report.reportAction === 'Delete'},
            {"bg-yellow-header" : report.reportAction === 'Edit'})}>{report.reportAction}</div>
          </div>
          <div className="flex gap-3 my-2">
            <div className={classNames("px-4 rounded-3xl text-white w-max",
            {"bg-orange-header" : !read},
            {"bg-yellow-header" : read})}>{type === 'sheet' ? report.summarypost.posterName : report.review.reviewer}</div>
            <div className={classNames({"text-orange-post" : !read},
            {"text-yellow-post" : read})}>{type === 'sheet' ? report.summarypost.summaryPostId : report.review.reviewId}</div>
          </div>
          <div className={`tracking-wide leading-6 line-clamp-3`}>
            <span className={classNames({"text-orange-header" : !read},
              {"text-yellow-header" : read})}>REPORT: </span>{report.reportDescription}
          </div>
        </div>
      </div>
    </div>
  );
}
