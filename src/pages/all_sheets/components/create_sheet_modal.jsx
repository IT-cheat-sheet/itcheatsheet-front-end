import React, { Fragment, useContext, useEffect, useRef } from "react";
import InputText from "../../../core/components/inputText";
import Dropdown from "../../../core/components/dropdown";
import { createSheetContext } from "./create_sheet_context";
import { Observer } from "mobx-react-lite";
import _ from "lodash";
import TextArea from "../../../core/components/textArea";

export default function CreateSheetModal({
  isOpen,
  onClose,
  onComplete,
  semesters
}) {
  const context = useContext(createSheetContext);

  const ref = useRef();

  useEffect(() => {
    context.prepareSubject();
    context.setValue("onClose", onClose);
    context.setValue("onComplete", onComplete);
  }, []);

  return (
    <Observer>
      {() => (
        <div>
          {isOpen && (
            <Fragment>
              <div
                className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50"
                style={{ zIndex: 100 }}
              />

              <div
                className="fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen backdrop-filter backdrop-blur-sm"
                style={{ zIndex: 100 }}
              >
                <div
                  className="w-full md:w-3/4 flex justify-between mb-2"
                >
                  {/* <p className="text-gray-form body-base">UPLOAD SHEET</p> */}
                  <h3 className="text-2xl font-bold text-white uppercase mx-4 mt-7 md-mt-0 md:mx-0 md:text-4xl flex">
                    <span className="material-icons text-white text-2xl md:hidden" onClick={() => {
                      onClose();
                      context.resetError();
                      context.setValue('file', null);
                    }}>arrow_back_ios</span>
                    UPLOAD SHEET
                  </h3>
                  <span
                    className="hidden text-4xl cursor-pointer material-icons text-gray-footer md:block"
                    onClick={() => {
                      onClose();
                      context.resetError();
                      context.setValue('file', null);
                    }}
                  >
                    cancel
                  </span>
                </div>
                <div
                  className="w-full h-full md:h-auto md:w-3/4 flex flex-col overflow-y-scroll hideScrollBar px-8 pt-6 pb-12 md:py-6 space-y-5 rounded-t-lg md:rounded-lg bg-violet-bg"
                >
                  <div className="flex flex-col w-full md:flex-row md:space-x-12">
                    <InputText
                      placeholder="Text here"
                      label="title"
                      page="sheet"
                      onChange={(e) => {
                        context.setValue("title", e.target.value);
                      }}
                      errorText={context.titleError}
                    />
                    <Dropdown
                      page="sheet"
                      label="semester/year"
                      options={_.map(semesters, (semester) => ({
                        name: semester.semester,
                        value: semester.semesterNumber,
                      }))}
                      setValue={(e) => {
                        context.setValue("semester", e);
                      }}
                      errorText={context.semesterError}
                    ></Dropdown>
                    <Dropdown
                      page="sheet"
                      label="subject"
                      options={_.map(context.subjectChoice, (subject) => ({
                        name: subject.subjectId + ": " + subject.subjectName,
                        value: subject.subjectNumber,
                      }))}
                      setValue={(e) => {
                        context.setValue("subject", e);
                      }}
                      errorText={context.subjectError}
                    ></Dropdown>
                    <InputText
                      placeholder="Text here"
                      label="your name"
                      page="sheet"
                      onChange={(e) => {
                        context.setValue("licence", e.target.value);
                      }}
                      errorText={context.licenceError}
                    />
                  </div>

                  <TextArea
                    page="sheet"
                    textAreaLabel="DESCRIPTION"
                    placeholder="Text here"
                    setValue={(x) => {
                      context.setValue("description", x);
                    }}
                    errorText={context.descriptionError}
                  />

                  <div className="flex flex-col items-start">
                    <p className="body-sm text-violet-bubbleText">LINK</p>
                    <InputText
                      placeholder="Text here"
                      page="sheet"
                      onChange={(e) => {
                        context.setValue("link", e.target.value);
                      }}
                      errorText={context.linkError}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between space-y-12 md:space-y-0 w-full">
                    <div className="w-full flex flex-col items-start space-y-2">
                      <p className="body-sm text-violet-bubbleText">
                        FILE
                        <span
                          className="ml-4 tracking-normal text-red-button"
                          style={{ fontSize: "10px" }}
                        >
                          {context.fileError}
                        </span>
                      </p>
                      <div className="flex flex-col w-full md:w-auto md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <button
                          className="h-10 px-4 rounded-lg bg-purple-button"
                          onClick={() => ref.current.click()}
                        >
                          <p className="text-white body-sm">Upload file...</p>
                        </button>
                        {context.file && (
                          <div className="flex max-w-full md:w-auto items-center px-4 space-x-2 text-left text-white rounded-full select-none body-sm bg-purple-button">
                            <p className="w-11/12 truncate">{context.file?.name || ""}</p>
                            <span
                              className="text-xl cursor-pointer material-icons text-gray-footer md:block"
                              onClick={() => context.setValue("file", null)}>
                              cancel
                            </span>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        ref={ref}
                        accept="application/pdf"
                        multiple={false}
                        onChange={(e) => {
                          context.setValue("file", e.target.files[0]);
                        }}
                      />
                    </div>
                    <button
                      className="w-full md:w-24 h-10 px-4 rounded-lg bg-purple-button"
                      onClick={() => context.onSubmit()}
                    >
                      <p className="text-white body-sm">POST</p>
                    </button>
                  </div>
                </div>
                {context.loading && (
                  <div className="absolute table bg-black opacity-60 w-full h-full">
                    <div className="table-cell align-middle">
                      <div className="flex justify-center">
                        <img
                          src="https://www.isabelhealthcare.com/assets/post_isabel/loading4-2fa514fd64ec8a05a04f3fc45b438f7e.gif"
                          alt="loading animation"
                          className="w-20 h-20" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Fragment>
          )}
        </div>
      )}
    </Observer>
  );
}
