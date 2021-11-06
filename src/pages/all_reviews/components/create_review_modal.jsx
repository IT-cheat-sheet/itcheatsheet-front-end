import React, { Fragment, useContext, useEffect, useRef } from "react";
import InputText from "../../../core/components/inputText";
import Dropdown from "../../../core/components/dropdown";
import { Observer } from "mobx-react-lite";
import _ from "lodash";
import { createReviewContext } from "./create_review_context";
import TextArea from "../../../core/components/textArea";

export default function CreateReviewModal({ topics, isOpen, onClose, onComplete }) {
  const context = useContext(createReviewContext);

  const ref = useRef();

  useEffect(() => {
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
                onClick={onClose}
              />

              <div
                className="fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen backdrop-filter backdrop-blur-sm"
                style={{ zIndex: 100 }}
              >
                <div
                  className="w-full md:w-3/4 flex justify-between mb-2"
                >
                  {/* <p className="text-gray-form body-base">CREATE THREAD</p> */}
                  <h3 className="text-2xl font-bold text-white uppercase mx-4 mt-7 md-mt-0 md:mx-0 md:text-4xl flex">
                    <span className="material-icons text-white text-2xl md:hidden" onClick={() => {
                      onClose();
                      context.resetError();
                      context.setValue('file', null);
                    }}>arrow_back_ios</span>
                    CREATE THREAD
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
                  className="w-full h-full md:h-auto md:w-3/4 flex flex-col overflow-y-scroll hideScrollBar px-8 pt-6 pb-12 md:py-6 space-y-5 rounded-t-lg md:rounded-lg bg-lightblue-bg"
                >
                  <div className="flex flex-col xl:w-4/5 md:flex-row md:space-x-12">
                      <InputText
                        label="thread name"
                        placeholder="Text Here"
                        page="review"
                        onChange={(e) => {
                          context.setValue("reviewTitle", e.target.value);
                        }}
                        errorText={context.reviewTitleError}
                      />
                      <Dropdown
                        page="review"
                        label="topic"
                        options={_.map(topics, (topic) => ({
                          name: topic.topicName,
                          value: topic.topicId,
                        }))}
                        setValue={(e) => {
                          context.setValue("topicId", e);
                        }}
                        errorText={context.topicIdError}
                      ></Dropdown>
                      <InputText
                        placeholder="Text here"
                        page="review"
                        label="license/your name"
                        onChange={(e) => {
                          context.setValue("reviewer", e.target.value);
                        }}
                        errorText={context.reviewerError}
                      />
                  </div>

                    <TextArea
                      page="review"
                      textAreaLabel="TEXT CONTENT"
                      placeholder="Text here"
                      setValue={(x) => {
                        context.setValue("reviewContent", x);
                      }}
                      errorText={context.reviewContentError}
                    />

                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between space-y-12 md:space-y-0 w-full">
                    <div className="flex flex-col w-full items-start space-y-2">
                      <p className="body-sm text-blue-body">
                        FILE
                      </p>
                      <div className="flex flex-col w-full md:w-auto md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <button
                          className="h-10 px-4 rounded-lg bg-blue-button"
                          onClick={() => ref.current.click()}
                        >
                          <p className="text-white body-sm">Upload file...</p>
                        </button>
                        {context.file && (
                          <div className="flex max-w-full md:w-auto items-center px-4 space-x-2 text-left text-white rounded-full select-none body-sm bg-blue-button">
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
                        accept="image/png, image/jpeg"
                        multiple={false}
                        onChange={(e) => {
                          context.setValue("file", e.target.files[0]);
                        }}
                      />
                    </div>
                    <button
                      className="w-full md:w-24 h-10 px-4 rounded-lg bg-blue-formHover"
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
