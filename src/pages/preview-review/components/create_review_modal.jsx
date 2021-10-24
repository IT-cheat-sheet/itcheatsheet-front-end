import React, { Fragment, useContext, useEffect, useRef } from "react";
import InputText from "../../../core/components/inputText";
import Dropdown from "../../../core/components/dropdown";
import { Observer } from "mobx-react-lite";
import _ from "lodash";
import { createReviewContext } from "./create_review_context";

export default function CreateReviewModal({ isOpen, onClose }) {
  const context = useContext(createReviewContext);

  const ref = useRef();

  useEffect(() => {
    context.prepareTopic();
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
                onClick={onClose}
              />

              <div
                className="fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen backdrop-filter backdrop-blur-sm"
                style={{ zIndex: 100 }}
              >
                <div
                  className="flex justify-between mb-2"
                  style={{ width: "1080px" }}
                >
                  <p className="text-gray-form body-base">CREATE THREAD</p>
                  <button
                    className="w-6 h-6 rounded-full bg-gray-footer"
                    onClick={onClose}
                  >
                    x
                  </button>
                </div>
                <div
                  className="flex flex-col px-8 py-6 space-y-5 rounded-lg bg-lightblue-bg"
                  style={{ width: "1080px" }}
                >
                  <div className="flex space-x-12">
                    <div className="flex flex-col items-start space-y-2">
                      <p className="body-sm text-blue-form">THREAD NAME</p>
                      <InputText
                        placeholder="title"
                        page="review"
                        onChange={(e) => {
                          context.setValue("reviewTitle", e.target.value);
                        }}
                      />
                      <p
                        className="h-4 text-red-button"
                        style={{ fontSize: "10px" }}
                      >
                        {context.reviewTitleError}
                      </p>
                    </div>

                    <div className="flex flex-col items-start space-y-2">
                      <p className="body-sm text-blue-form">TOPIC</p>
                      <Dropdown
                        page="review"
                        options={_.map(context.topic, (topic) => ({
                          name: topic.topicName,
                          value: topic.topicId,
                        }))}
                        setValue={(e) => {
                          context.setValue("topicId", e);
                        }}
                      ></Dropdown>
                      <p
                        className="h-4 text-red-button"
                        style={{ fontSize: "10px" }}
                      >
                        {context.topicIdError}
                      </p>
                    </div>

                    <div className="flex flex-col items-start space-y-2">
                      <p className="body-sm text-blue-form">
                        LISENCE/YOUR NAME
                      </p>
                      <InputText
                        placeholder="Text here"
                        page="review"
                        onChange={(e) => {
                          context.setValue("reviewer", e.target.value);
                        }}
                      />
                      <p
                        className="h-4 text-red-button"
                        style={{ fontSize: "10px" }}
                      >
                        {context.reviewerError}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start space-y-2">
                    <p className="body-sm text-blue-form">TEXT CONTENT</p>
                    <textarea
                      className="w-full px-6 py-3 overflow-y-auto placeholder-opacity-50 rounded-lg h-36 body-sm text-blue-form focus:outline-none placeholder-blue-form"
                      placeholder="Please text politely :)"
                      onChange={(e) => {
                        context.setValue("reviewContent", e.target.value);
                      }}
                    />
                    <p
                      className="h-4 text-red-button"
                      style={{ fontSize: "10px" }}
                    >
                      {context.reviewContentError}
                    </p>
                  </div>

                  <div className="flex flex-col items-start space-y-2">
                    <p className="body-sm text-blue-form">LINK</p>
                    <InputText
                      placeholder="Link"
                      page="review"
                      onChange={(e) => {
                        context.setValue("reviewLink", e.target.value);
                      }}
                    />
                    <p
                      className="h-4 text-red-button"
                      style={{ fontSize: "10px" }}
                    >
                      {context.reviewLinkError}
                    </p>
                  </div>

                  <div className="flex items-end justify-between w-full">
                    <div className="flex flex-col items-start space-y-2">
                      <p className="body-sm text-blue-form">FILE</p>
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
                      className="w-24 h-10 px-4 rounded-lg bg-blue-formHover"
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
