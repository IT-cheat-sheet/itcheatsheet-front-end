import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import Navbar from "../../core/components/navbar";
import Footer from "../../core/components/footer";
import SearchBox from "../../core/components/searchBox";
import SheetThumb from "./components/sheet_thumb";
import Carousel from "../../core/components/carousel";
import Pagination from "../../core/components/pagination";
import CreateSheetModal from "./components/create_sheet_modal";
import { allSheetContext } from "./all_sheets_context";
import _ from 'lodash';
import { Observer } from "mobx-react-lite";
import ConfirmModal from "../../core/components/comfirmModal";

export default function AllSheets() {
  const context = useContext(allSheetContext);
  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  var page = params.get('page') ?? 1;
  page = parseInt(page);

  const onFilter = (x) => {
    context.setValue('filter', x);
    //Force Back to First Page
    history.replace('/sheets');
  }

  const onSearch = (x) => {
    context.setValue('searchWord', x);
    //Force Back to First Page
    history.replace('/sheets');
  }

  useEffect(() => {
    context.setValue('current', page)
    context.prepareSemester();
    context.prepareSheet();
    document.title = "ITCheatSheet – Sheets"
  }, [location])

  return (
    <Observer>
      {() => (
      <div className="bg-violet-bg md:bg-white">
        <Navbar />
        <div className="md:hidden">
            <Carousel page="sheet" />
          </div>
        <div className="lg:mx-44 md:mb-24 px-4 md:p-0">
          <div className="hidden md:block">
            <Carousel page="sheet" />
          </div>
          <div className="md:hidden body-base font-bold text-violet-sheet mt-14 mb-5">ALL SHEET</div>
          <div className="hidden md:block header-popup text-violet-sheet mt-14 mb-5">ALL SHEET</div>
          <div className="pb-6 md:p-14 md:rounded-lg md:bg-violet-bg">
            <SearchBox page="sheet" options={
              _.map(context.semesters, (semester) => ({
                key: semester.semester,
                value: semester.semesterNumber
              }))
            } onFilter={onFilter} onSearch={onSearch} />
            {context.isLoad ? (
              context.sheets.length > 0 ?
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mt-4">
                  {
                    _.map(context.sheets, (sheet, index) => (
                      <SheetThumb id={sheet.summaryPostId} fileName={sheet.summaryTitle} link={sheet.linkAttachment}/>
                    ))
                  }
                </div>
                <div className="pt-12">
                  <Pagination page="sheet" current={context.current} total={context.total} url="/sheets" />
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
          <button className="button-circular fixed z-30 bottom-7 right-4 md:bottom-12 md:right-24" onClick={() => context.setValue('createToggle', true)}>
            <span className="material-icons-outlined text-5xl md:text-7xl">file_upload</span>
          </button>
        </div>
        <CreateSheetModal isOpen={context.createToggle} onClose={() => context.setValue('createToggle', false)} onComplete={() => context.setValue('confirmToggle', true)} />
        <ConfirmModal
              isOpen={context.confirmToggle}
              onButtonClick={() => {
                context.setValue('confirmToggle', false);
                context.prepareSheet();
              }}
              onClose={() => {
                context.setValue('confirmToggle', false);
                context.prepareSheet();
              }}
              label="upload sheet"
              buttonText="ok"
              header="sheet posted successfully!"
              buttonColor="green" />
        <div className="h-12 bg-white md:hidden"></div>
        <Footer />
      </div>
      )}
    </Observer>
  )
}