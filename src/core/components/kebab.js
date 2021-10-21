import React, { useState } from 'react'
import Button from './button'

export default function Kebab({ page }) {
  const [toggle, setToggle] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);

  const share = () => {
    if (navigator.share) {
      navigator.share({
        url: window.location.href,
      })
    } else {
      setOpenShareModal(true);
    }
  }

  return (
    <div className={`text-right relative w-27 md:w-36 lg:w-64 ${page === 'sheet' ? 'text-violet-hover' : 'text-blue-body'}`}>
      <span className="material-icons cursor-pointer p-1" onClick={() => setToggle(!toggle)}>more_vert</span>
      {toggle
        ? <div className={`uppercase w-27 md:w-36 lg:w-60 text-center absolute top-0 right-7 text-xs md:text-sm lg:text-xl rounded-lg ${page === 'sheet' ? 'bg-violet-bubble' : 'bg-lightblue-lighter'}`}>
          <p className={`py-2 lg:py-5 cursor-pointer rounded-t-lg flex justify-center items-center ${page === 'sheet' ? 'hover:bg-violet-bubbleHover' : 'hover:bg-lightblue-light'}`}
            onClick={share}>
            share
            <span className="material-icons ml-1.5 text-xs md:text-base lg:text-xl">share</span>
          </p>
          <hr className={`opacity-100 ${page === 'sheet' ? 'border-violet-hover' : 'bg-lightblue-light'}`} />
          <p className={`py-2 lg:py-5 cursor-pointer rounded-b-lg flex justify-center items-center ${page === 'sheet' ? 'hover:bg-violet-bubbleHover' : 'hover:bg-lightblue-light'}`} onClick={() => alert('suggest modal open')}>
            suggestion
            <span className="material-icons ml-1.5 text-xs md:text-base lg:text-xl">edit</span>
          </p>
        </div>
        : <></>}
      {
        openShareModal ?
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="relative p-6 flex-auto text-center mx-6">
                    <span class="material-icons-outlined text-5xl">
                      sentiment_dissatisfied
                    </span>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      Sorry, the share feature is currently not available on your browser.
                      <br/>
                      Try using other browsers.
                    </p>
                    <br/>
                    {
                      page === 'sheet' ?
                      <Button color="violet" size="sm" onClick={() => setOpenShareModal(false)}>OK</Button>
                      : <Button color="blue" size="sm" onClick={() => setOpenShareModal(false)}>OK</Button>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
          : <></>
      }
    </div>
  )
}