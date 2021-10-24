import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Navbar from "../../core/components/navbar";
import Footer from "../../core/components/footer";
import SearchBox from "../../core/components/searchBox";
import SheetThumb from "./sheet_thumb";
import Carousel from "../../core/components/carousel";
import { Link } from "react-router-dom";
import Pagination from "../../core/components/pagination";

export default function AllSheets() {
  const [semesters] = useState([]);
  const [sheets] = useState([]);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  var [searchWord, setSearchWord] = useState('');
  var [filter, setFilter] = useState('');

  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  var page = params.get('page') ?? 1;
  page = parseInt(page);

  const pageSize = 12;

  const onFilter = (x) => {
    setFilter(x);
    //Force Back to First Page
    history.replace('/sheets');
  }

  const onSearch = (x) => {
    setSearchWord(x);
    //Force Back to First Page
    history.replace('/sheets');
  }

  useEffect(() => {
    if(semesters.length === 0){
      (async function() {
        try {
          const res = await fetch(`http://localhost:3000/semester/getall`);
          const data = await res.json();
      
          if(res.status === 200){
            data.semesters.forEach((semester) => {
              semesters.push({key: semester.semester, value: semester.semesterNumber});
            })
          }
        } catch (err) {
          console.log(err);
          alert(err.message);
        }
      })();
    }
    
    (async function() {
      try {
        const res = await fetch(`http://localhost:3000/summarypost/getAll?pageNumber=${page}&pageSize=${pageSize}&search=${searchWord}&semesterFilter=${filter}&sortType=DESC`);
        const data = await res.json();
      
        if(res.status === 200){
          //Clear Existing Reviews
          sheets.length = 0;
      
          data.summaryPosts.rows.forEach((sheet) => {
            sheets.push(sheet);
          })

          setCurrent(page);
          setTotal(data.totalPage);

          setIsLoad(true);
        }
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    })();

  }, [semesters, filter, page, sheets, searchWord])

  return (
    <div className="bg-violet-bg md:bg-white">
      <Navbar />
      <div className="md:hidden">
          <Carousel page="sheet" />
        </div>
      <div className="md:mx-44 md:mb-24 px-4 md:p-0">
        <div className="hidden md:block">
          <Carousel page="sheet" />
        </div>
        <div className="md:hidden body-base font-bold text-violet-sheet mt-14 mb-5">ALL SHEET</div>
        <div className="hidden md:block header-popup text-violet-sheet mt-14 mb-5">ALL SHEET</div>
        <div className="pb-6 md:p-14 md:rounded-lg md:bg-violet-bg">
          <SearchBox page="sheet" options={semesters} onFilter={onFilter} onSearch={onSearch} />
          {isLoad ? (
            sheets.length > 0 ?
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 mt-4">
                {
                  sheets.map((sheet, index) => (
                    <Link key={index} to={`/sheets/${sheet.summaryPostId}`}>
                      <SheetThumb id={sheet.summaryPostId} fileName={sheet.summaryTitle} link={sheet.linkAttachment}/>
                    </Link>
                  ))
                }
              </div>
              <div className="pt-12">
                <Pagination page="sheet" current={current} total={total} url="/sheets" />
              </div>
            </div> :
            <div className="text-center header-tertiary md:header-secondary text-purple-hover my-20 md:my-28">
              <span className="material-icons-round text-9xl block mb-5">sentiment_very_dissatisfied</span>
              No Sheets Found
          </div>
          ) : <></>}
        </div>
      </div>
      <div>
        <button className="button-circular fixed z-30 bottom-7 right-4 md:bottom-12 md:right-24">
          <span className="material-icons-outlined text-5xl md:text-7xl">file_upload</span>
        </button>
      </div>
      <div className="h-12 bg-white md:hidden"></div>
      <Footer />
    </div>
  )
}