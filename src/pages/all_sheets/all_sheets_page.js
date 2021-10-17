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
    //Force Refresher to ensure that the page will fetch the current filter
    setCurrent(0);
    //Force Back to First Page
    history.replace('/sheets');
  }

  const onSearch = (x) => {
    setSearchWord(x);
    //Force Refresher to ensure that the page will fetch the current search word
    setCurrent(0);
    //Force Back to First Page
    history.replace('/sheets');
  }

  useEffect(() => {
    if(semesters.length === 0){
      (async function() {
        const res = await fetch(`http://localhost:3000/semester/getall`);
        const data = await res.json();
      
        data.semesters.forEach((semester) => {
          semesters.push(semester.semester);
        })
      })();
    }
    
    (async function() {
      const res = await fetch(`http://localhost:3000/summarypost/getAll?pageNumber=${page}&pageSize=${pageSize}&search=${searchWord}`);
      const data = await res.json();
      
      //Clear Existing Reviews
      sheets.length = 0;
      
      data.summaryPosts.rows.forEach((sheet) => {
        sheets.push(sheet);
      })

      setCurrent(page);
      setTotal(data.totalPage);
    })();

  }, [semesters, filter, page, sheets, searchWord])

  return (
    <div>
      <Navbar />
      <div className="mx-44 mb-24">
        <Carousel page="sheet" />
        <div className="header-popup text-violet-sheet mt-14 mb-5">ALL SHEET</div>
        <div className="p-14 rounded-lg bg-violet-bg">
          <SearchBox page="sheet" options={semesters} onFilter={onFilter} onSearch={onSearch} />
          {
            sheets.length > 0 ?
            <div>
              <div className="grid grid-cols-4 mt-4">
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
            <div className="text-center header-secondary text-purple-hover my-28">
            <i className="fas fa-times-circle header-primary block mb-5"></i>
            No Sheets Found
          </div>
          }
        </div>
      </div>
      <Footer />
    </div>
    
  )
}