import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AdminNavbar from "../../core/components/adminNavbar";
import Footer from "../../core/components/footer";
import SearchBox from "../../core/components/searchBox";
import AdminThumb from "./admin_thumb";

export default function AdminHome() {
  const [reports] = useState([]);
  const [readPage, setReadPage] = useState(false);
  // eslint-disable-next-line
  const [refresher, setRefresher] = useState(false);

  const [searchWord, setSearchWord] = useState('');
  const [filter, setFilter] = useState('');

  const history = useHistory();

  const amount = useRef(-1);

  const getCookie = (name) => {
    return document.cookie.split(';').find(c => c.trim().startsWith(name + '=')).substring((name + '=').length);
  }

  const token = getCookie('cheatSheetToken');

  const onRead = (index, id) => {
    if(reports[index].readStatus === 0){
      fetch(`http://localhost:3000/report/setReadStatus/${id}`, {method: 'PUT', headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}, body: JSON.stringify({readStatus: 1})});
    }
  }

  useEffect(() => {
    if(token === null){
      history.replace('/admin/login');
    }

    (async function() {
      const res = await fetch(`http://localhost:3000/report/getAll?sortBy=${filter}&search=${searchWord}&readStatus=${readPage ? 1 : 0}`,
      {headers: {"Authorization": `Bearer ${token}`}});
      const data = await res.json();
      
      //Clear Existing Reports
      reports.length = 0;
      
      data.reports.forEach((report) => {
        reports.push(report);
      })

      reports.reverse();

      if(amount.current < 0){
        amount.current = reports.length;
      }

      setRefresher(r => !r);
    })();
  }, [readPage, history, reports, filter, searchWord, token])

  return (
    <div>
      <AdminNavbar />
      <div className="mx-36 mb-16">
          <div className="header-tertiary text-gray-mailbox mt-10 mb-5 flex items-center gap-4">
            TASKS
            <div className="relative">
              <span className={`material-icons-outlined text-3xl inline-block px-2 py-1.5 text-white rounded-full ${reports.length > 0 ? 'bg-gray-mailbox' : 'bg-gray-emptymail'}`}>
                inbox
              </span>
              <div className={`${amount.current > 0 ? 'absolute' : 'hidden'} -top-2 left-8 bg-red-button rounded-full text-white text-sm py-1 px-2`}>
                {amount.current > 99 ? '99+' : amount.current.toString()}
              </div>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-6 gap-4">
            <div className="col-span-1">
              <button className={`w-full cursor-pointer transition duration-100 flex justify-center items-center h-12
              ${readPage ? 'button-not-selected border-orange-button hover:border-orange-hover text-orange-button hover:text-orange-hover' : 'button-base bg-orange-button hover:bg-orange-hover text-white'}`}
              onClick={() => setReadPage(false)}>UNREAD</button>
            </div>
            <div className="col-span-1">
            <button className={`w-full cursor-pointer transition duration-100 flex justify-center items-center h-12
              ${!readPage ? 'button-not-selected border-yellow-button hover:border-yellow-hover text-yellow-button hover:text-yellow-hover' : 'button-base bg-yellow-button hover:bg-yellow-hover text-white'}`}
              onClick={() => setReadPage(true)}>READ</button>
            </div>
            <div className="col-span-4">
              <SearchBox page="admin" options={[
                {key: 'Sheets', value: 'summaryPost'},
                {key: 'Thread', value: 'review'}
              ]} onFilter={setFilter} onSearch={setSearchWord} />
            </div>
          </div>
          {
            reports.length > 0 ?
            <div>
              <div className="flex flex-col mt-7">
                {
                  reports.map((report, index) => (
                    <Link onClick={() => onRead(index, report.reportNumber)} key={index} to={report.summaryPostId ? `/admin/sheets/${report.summaryPostId}` : `/admin/reviews/${report.reviewId}`}>
                      <AdminThumb type={report.summaryPostId ? 'sheet' : 'review'} read={readPage} report={report} />
                    </Link>
                  ))
                }
              </div>
            </div> :
            <div className={`text-center header-secondary my-28 ${readPage ? "text-yellow-hover" : "text-orange-hover"}`}>
              <span className="material-icons-outlined text-9xl block mb-5">drafts</span>
              No Report Found
            </div>
          }
      </div>
      <Footer />
    </div>
  );
}
