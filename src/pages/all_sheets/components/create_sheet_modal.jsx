import React, { Fragment, useContext, useEffect, useRef } from "react";
import InputText from "../../../core/components/inputText";
import Dropdown from "../../../core/components/dropdown";
import { createSheetContext } from "./create_sheet_context";
import { Observer } from "mobx-react-lite";
import _ from "lodash";
import TextArea from "../../../core/components/textArea";

export default function CreateSheetModal({ isOpen, onClose, onComplete, semesters }) {
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
                  className="flex justify-between mb-2"
                  style={{ width: "1080px" }}
                >
                  {/* <p className="text-gray-form body-base">UPLOAD SHEET</p> */}
                  <h3 className="uppercase text-white text-2xl md:text-4xl font-bold">UPLOAD SHEET</h3>
                  <span className="material-icons text-gray-footer text-4xl cursor-pointer hidden md:block" onClick={() => {
                    onClose();
                    context.resetError();
                  }}>cancel</span>
                </div>
                <div
                  className="flex flex-col px-8 py-6 space-y-5 rounded-lg bg-violet-bg"
                  style={{ width: "1080px" }}
                >
                  <div className="flex space-x-12">
                    <div className="flex flex-col items-start">
                      <InputText
                        placeholder="Text here"
                        label="title"
                        page="sheet"
                        onChange={(e) => {
                          context.setValue("title", e.target.value);
                        }}
                        errorText={context.titleError}
                      />
                    </div>

                    <div className="flex flex-col items-start">
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
                    </div>

                    <div className="flex flex-col items-start">
                      <Dropdown
                        page="sheet"
                        label="subject"
                        options={_.map(context.subjectChoice, (subject) => ({
                          name: subject.subjectId + ': ' + subject.subjectName,
                          value: subject.subjectNumber,
                        }))}
                        setValue={(e) => {
                          context.setValue("subject", e);
                        }}
                        errorText={context.subjectError}
                      ></Dropdown>
                    </div>

                    <div className="flex flex-col items-start">
                      <InputText
                        placeholder="Text here"
                        label="license/your name"
                        page="sheet"
                        onChange={(e) => {
                          context.setValue("licence", e.target.value);
                        }}
                        errorText={context.licenceError}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <TextArea page="sheet" textAreaLabel="DESCRIPTION" placeholder="Text here" setValue={(x) => {
                        context.setValue("description", x);
                      }} errorText={context.descriptionError} />
                  </div>

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

                  <div className="flex items-end justify-between w-full">
                    <div className="flex flex-col items-start space-y-2">
                      <p className="body-sm text-violet-bubbleText">FILE
                      <span
                          className="text-red-button tracking-normal ml-4"
                          style={{ fontSize: "10px" }}
                        >
                        {context.fileError}
                      </span></p>
                      <div className="flex items-center space-x-4">
                        <button
                          className="h-10 px-4 rounded-lg bg-purple-button"
                          onClick={() => ref.current.click()}
                        >
                          <p className="text-white body-sm">Upload file...</p>
                        </button>
                        {context.file && (
                          <p className="text-left truncate select-none w-72">
                            {context.file?.name || ""}
                          </p>
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
                      className="w-24 h-10 px-4 rounded-lg bg-purple-button"
                      onClick={() => context.onSubmit()}
                    >
                      <p className="text-white body-sm">POST</p>
                    </button>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      )}
    </Observer>
  );
}
