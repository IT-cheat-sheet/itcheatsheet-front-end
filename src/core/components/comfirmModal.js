import React, { Fragment } from "react";
import Button from "./button";

export default function ConfirmModal({ isOpen, onClose, onButtonClick, label, buttonText, header, desc, buttonColor }) {
  return (
    <Fragment>
      {isOpen && (
        <Fragment>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-60 outline-none focus:outline-none mx-4 backdrop-filter backdrop-blur-sm">
            <div className="relative md:w-1/3 w-5/6 my-6 mx-auto max-w-3xl text-left">
              <div className="flex justify-between">
                <h3 className="uppercase text-white text-2xl md:text-4xl font-bold">{label}</h3>
                <span className="material-icons text-white text-2xl md:text-4xl cursor-pointer" onClick={onClose}>cancel</span>
              </div>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-footer outline-none focus:outline-none mt-2 md:mt-5">
                <div className="relative p-6 flex-auto mx-6 text-center text-black">
                  <p className="text-lg md:text-2xl text-gray-subheader font-bold uppercase">{header}</p>
                  <div className="mt-5 uppercase">
                    <Button color={buttonColor} size="sm" onClick={onButtonClick}>{buttonText}</Button>
                  </div>
                  {desc !== undefined && (<p className={`text-md text-red-button mt-2`}>{desc}</p>)}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-50 bg-black"></div>
        </Fragment>
      )}
    </Fragment>
  )
}