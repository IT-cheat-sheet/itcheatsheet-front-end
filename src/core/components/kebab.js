import React, { useEffect, useState } from 'react'
import Button from './button'
import ConfirmModal from './comfirmModal';
import Dropdown from './dropdown';
import TextArea from './textArea';

export default function Kebab({ page, postId }) {
  const [toggle, setToggle] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openSuggestModal, setOpenSuggestModal] = useState(false);
  const [openSendSuccessModal, setOpenSendSuccessModal] = useState(false);
  const [openSendFailModal, setOpenSendFailModal] = useState(false);
  const [actionSelected, setActionSelected] = useState("");
  const [description, setDescription] = useState("");
  const [showError, setShowError] = useState(false);

  const action = [
    {
      name: "Edit",
      value: "Edit"
    },
    {
      name: "Delete",
      value: "Delete"
    }
  ]

  const share = () => {
    if (navigator.share) {
      navigator.share({
        url: window.location.href,
      })
    } else {
      setOpenShareModal(true);
    }
  }

  const validate = () => {
    return actionSelected !== "" && description !== "";
  };

  const sendReport = async () => {
    if (validate()) {
      setShowError(false);
      const res = await fetch(`http://localhost:3000/report/add`,
        (page === "sheet") ?
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              summaryPostId: postId,
              reportAction: actionSelected,
              reportDescription: description,
              readStatus: 0
            })
          }
          :
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              reviewId: postId,
              reportAction: actionSelected,
              reportDescription: description,
              readStatus: 0
            })
          }
      );
      if (res.status === 201) {
        setOpenSendSuccessModal(true);
        setOpenSuggestModal(false);
      } else {
        setOpenSendFailModal(true);
        setOpenSuggestModal(false);
      }
    } else {
      setShowError(true);
    }
  }

  useEffect(() => {
    const closeKebab = (e) => {
      if(!e.target.classList.contains('kebab')){
        setToggle(false);
      }
    }
    document.addEventListener('click', closeKebab);
    return () => {
      document.removeEventListener('click', closeKebab);
    }
  })

  return (
    <div className={`text-right relative w-27 md:w-36 lg:w-64 ${page === 'sheet' ? 'text-violet-hover' : 'text-blue-body'}`}>
      <span className="kebab material-icons cursor-pointer p-1" onClick={() => setToggle(!toggle)}>more_vert</span>
      {toggle
        ? <div className={`uppercase w-27 md:w-36 lg:w-60 text-center absolute top-0 right-7 text-xs md:text-sm lg:text-xl rounded-lg ${page === 'sheet' ? 'bg-violet-bubbleHover' : 'bg-lightblue-lighter'}`}>
          <p className={`py-2 lg:py-5 cursor-pointer rounded-t-lg flex justify-center items-center hover:text-white ${page === 'sheet' ? 'hover:bg-violet-hover' : 'hover:bg-blue-page'}`}
            onClick={share}>
            share
            <span className="material-icons ml-1.5 text-xs md:text-base lg:text-xl">share</span>
          </p>
          <hr className={`opacity-100 ${page === 'sheet' ? 'border-violet-hover' : 'bg-lightblue-light'}`} />
          <p className={`py-2 lg:py-5 cursor-pointer rounded-b-lg flex justify-center items-center hover:text-white ${page === 'sheet' ? 'hover:bg-violet-hover' : 'hover:bg-blue-page'}`}
            onClick={() => setOpenSuggestModal(true)}>
            suggestion
            <span className="material-icons ml-1.5 text-xs md:text-base lg:text-xl">edit</span>
          </p>
        </div>
        : <></>}
      {
        openShareModal ?
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-4 backdrop-filter backdrop-blur-sm"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="relative p-6 flex-auto text-center mx-6">
                    <span className="material-icons-outlined text-5xl">
                      sentiment_dissatisfied
                    </span>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      Sorry, the share feature is currently not available on your browser.
                      <br />
                      Try using other browsers.
                    </p>
                    <br />
                    {
                      page === 'sheet' ?
                        <Button color="violet" size="sm" onClick={() => setOpenShareModal(false)}>OK</Button>
                        : <Button color="blue" size="sm" onClick={() => setOpenShareModal(false)}>OK</Button>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
          </>
          : <></>
      }
      {
        openSuggestModal ?
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto md:overflow-y-hidden fixed inset-0 z-60 outline-none focus:outline-none mx-0 md:mx-4 md:backdrop-filter md:backdrop-blur-sm"
            >
              <div className="relative w-full h-screen md:h-auto md:w-4/5 my-6 mx-auto max-w-3xl text-left">
                <div className="flex md:justify-between mx-4 md:mx-0 pt-10 md:pt-0">
                  <span class="material-icons text-white text-2xl md:hidden" onClick={() => setOpenSuggestModal(false)}>arrow_back_ios</span>
                  <h3 className="uppercase text-white text-2xl md:text-4xl font-bold">report form</h3>
                  <span className="material-icons text-white text-4xl cursor-pointer hidden md:block" onClick={() => setOpenSuggestModal(false)}>cancel</span>
                </div>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-screen md:h-auto bg-gray-footer outline-none focus:outline-none mt-5">
                  <div className="relative p-6 flex-auto md:mx-6">
                    <form>
                      {
                        showError ?
                          <p className="text-red-button mb-2">Please fill every field.</p> :
                          <></>
                      }
                      <Dropdown label="ACTIONS" options={action} setValue={setActionSelected} />
                      <div className="mt-5">
                        <TextArea textAreaLabel="EXPLANATION" setValue={setDescription} />
                      </div>
                      <div className="mt-10">
                        <Button color="green" size="sm" onClick={() => sendReport()}>SEND</Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
          </>
          : <></>
      }
      <ConfirmModal
              isOpen={openSendSuccessModal}
              onButtonClick={() => setOpenSendSuccessModal(false)}
              onClose={() => setOpenSendSuccessModal(false)}
              label="report form"
              buttonText="ok"
              header="Send Successfully!"
              buttonColor="green" />
      <ConfirmModal
              isOpen={openSendFailModal}
              onButtonClick={() => setOpenSendFailModal(false)}
              onClose={() => setOpenSendFailModal(false)}
              label="report form"
              buttonText="ok"
              header="There's some problem occured when processing your request.
              <br />
              Please try again later."
              buttonColor="red" />
    </div>
  )
}