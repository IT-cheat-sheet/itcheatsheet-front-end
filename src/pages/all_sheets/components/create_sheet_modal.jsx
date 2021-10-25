import React, { Fragment, useContext, useEffect, useRef } from "react";
import InputText from "../../../core/components/inputText";
import Dropdown from "../../../core/components/dropdown";
import { createSheetContext } from "./create_sheet_context";
import { Observer } from "mobx-react-lite";
import _ from "lodash";

export default function CreateSheetModal({ isOpen, onClose }) {
  const context = useContext(createSheetContext);

  const ref = useRef();

  useEffect(() => {
    context.prepareSemester();
    context.prepareSubject();
    context.setValue("onClose", onClose);
  }, []);

  return (
    <Observer>
      {() => (
        <div>
          {isOpen && (
            <Fragment>
              <div
                className="fixed top-0 left-0 w-screen h-screen bg-black opacity-20"
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
                  <p className="text-gray-form body-base">UPLOAD SHEET</p>
                  <button
                    className="w-6 h-6 rounded-full bg-gray-footer"
                    onClick={onClose}
                  >
                    x
                  </button>
                </div>
                <div
                  className="flex flex-col px-8 py-6 space-y-5 rounded-lg bg-violet-bg"
                  style={{ width: "1080px" }}
                >
                  <div className="flex space-x-12">
                    <div className="flex flex-col items-start space-y-2">
                      <InputText
                        placeholder="Text here"
                        label="title"
                        page="sheet"
                        onChange={(e) => {
                          context.setValue("title", e.target.value);
                        }}
                      />
                      <p
                        className="h-4 text-red-button"
                        style={{ fontSize: "10px" }}
                      >
                        {context.titleError}
                      </p>
                    </div>

                    <div className="flex flex-col items-start space-y-2">
                      <Dropdown
                        page="sheet"
                        label="semester/year"
                        options={_.map(context.semesterChoice, (semester) => ({
                          name: semester.semester,
                          value: semester.semesterNumber,
                        }))}
                        setValue={(e) => {
                          context.setValue("semester", e);
                        }}
                      ></Dropdown>
                      <p
                        className="h-4 text-red-button"
                        style={{ fontSize: "10px" }}
                      >
                        {context.semesterError}
                      </p>
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
                      ></Dropdown>
                      <p
                        className="h-4 text-red-button"
                        style={{ fontSize: "10px" }}
                      >
                        {context.subjectError}
                      </p>
                    </div>

                    <div className="flex flex-col items-start">
                      <InputText
                        placeholder="Text here"
                        label="license/your name"
                        page="sheet"
                        onChange={(e) => {
                          context.setValue("licence", e.target.value);
                        }}
                      />
                      <p
                        className="h-4 text-red-button"
                        style={{ fontSize: "10px" }}
                      >
                        {context.licenceError}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start space-y-2">
                    <p className="body-sm text-violet-bubbleText">
                      DESCRIPTION
                    </p>
                    <textarea
                      className="w-full px-6 py-3 overflow-y-auto rounded-lg h-36 body-sm text-violet-bubbleText focus:outline-none"
                      placeholder="Text here"
                      onChange={(e) => {
                        context.setValue("description", e.target.value);
                      }}
                    />
                    <p
                      className="h-4 text-red-button"
                      style={{ fontSize: "10px" }}
                    >
                      {context.descriptionError}
                    </p>
                  </div>

                  <div className="flex flex-col items-start space-y-2">
                    <p className="body-sm text-violet-bubbleText">LINK</p>
                    <InputText
                      placeholder="Text here"
                      page="sheet"
                      onChange={(e) => {
                        context.setValue("link", e.target.value);
                      }}
                    />
                    <p
                      className="h-4 text-red-button"
                      style={{ fontSize: "10px" }}
                    >
                      {context.linkError}
                    </p>
                  </div>

                  <div className="flex items-end justify-between w-full">
                    <div className="flex flex-col items-start space-y-2">
                      <p className="body-sm text-violet-bubbleText">FILE</p>
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