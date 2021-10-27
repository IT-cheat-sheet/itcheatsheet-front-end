import { Observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdminNavbar from "../../core/components/adminNavbar";
import Footer from "../../core/components/footer";
import SearchBox from "../../core/components/searchBox";
import AdminThumb from "./admin_thumb";
import { adminHomeContext } from "./admin_home_context";
import _ from 'lodash';

export default function AdminHome() {
  const context = useContext(adminHomeContext);
  const history = useHistory();

  if(context.token === null){
    history.replace('/admin/login');
  }

  useEffect(() => {
    context.setValue("title","ITCheatSheet-Admin Tasks");
    document.title = context.title;
    if(context.token !== null){
      context.prepareReport();
    }
  }, [])

  return (
    <Observer>
      {() => (
      <div>
        <AdminNavbar />
        <div className="mx-36 mb-16">
            <div className="header-tertiary text-gray-mailbox mt-10 mb-5 flex items-center gap-4">
              TASKS
              <div className="relative">
                <span className={`material-icons-outlined text-3xl inline-block px-2 py-1.5 text-white rounded-full ${context.reports.length > 0 ? 'bg-gray-mailbox' : 'bg-gray-emptymail'}`}>
                  inbox
                </span>
                <div className={`${context.amount > 0 ? 'absolute' : 'hidden'} -top-2 left-8 bg-red-button rounded-full text-white text-sm py-1 px-2`}>
                  {context.amount > 99 ? '99+' : context.amount.toString()}
                </div>
              </div>
            </div>
            <div className="mt-14 grid grid-cols-6 gap-4">
              <div className="col-span-1">
                <button className={`w-full cursor-pointer transition duration-100 flex justify-center items-center h-12
                ${context.readPage ? 'button-not-selected border-orange-button hover:border-orange-hover text-orange-button hover:text-orange-hover' : 'button-base bg-orange-button hover:bg-orange-hover text-white'}`}
                onClick={() => {
                  context.setValue('readPage', false);
                  context.prepareReport();
                  }}>PENDING</button>
              </div>
              <div className="col-span-1">
              <button className={`w-full cursor-pointer transition duration-100 flex justify-center items-center h-12
                ${!context.readPage ? 'button-not-selected border-yellow-button hover:border-yellow-hover text-yellow-button hover:text-yellow-hover' : 'button-base bg-yellow-button hover:bg-yellow-hover text-white'}`}
                onClick={() => {
                  context.setValue('readPage', true);
                  context.prepareReport();
                }}>DONE</button>
              </div>
              <div className="col-span-4">
                <SearchBox page="admin" options={[
                  {key: 'Sheets', value: 'summaryPost'},
                  {key: 'Thread', value: 'review'}
                ]} onFilter={(x) => {
                  context.setValue('filter', x);
                  context.prepareReport();
                }} onSearch={(x) => {
                  context.setValue('searchWord', x);
                  context.prepareReport();
                }} />
              </div>
            </div>
            {context.isLoad ? (
              context.reports.length > 0 ?
              <div>
                <div className="flex flex-col mt-7">
                  {
                    _.map(context.reports, (report, index) => (
                      <div key={index} onClick={() => {
                        if(!context.readPage){
                          history.push(report.summaryPostId ? `/admin/sheets/${report.summaryPostId}` : `/admin/reviews/${report.reviewId}`, { reportNumber: report.reportNumber})
                        }
                      }}>
                        <AdminThumb type={report.summaryPostId ? 'sheet' : 'review'} read={context.readPage} report={report} />
                      </div>
                    ))
                  }
                </div>
              </div> :
              <div className={`text-center header-secondary my-28 ${context.readPage ? "text-yellow-hover" : "text-orange-hover"}`}>
                <span className="material-icons-outlined text-9xl block mb-5">drafts</span>
                No Report Found
              </div>
            ) : <></>}
        </div>
        <Footer />
      </div>
      )
      }
    </Observer>
  );
}
