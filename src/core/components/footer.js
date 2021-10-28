import React from 'react'

export default function Footer() {
    return (
        <div className=" static bottom-0 grid w-full bg-gray-100 py-6 text-xs tracking-tight  sm:text-sm sm:tracking-wide justify-self-center bg-gray-footer text-gray-subheader">
            <div className="flex place-self-center " >
                <div className="flex items-center " >
                    <div className=" flex place-self-center  ">
                        <span className="material-icons font-light  ">
                            copyright
                        </span>
                    </div>
                    <p className="mt-1 pl-1">Copyright 2021  |  SIT KMUTT | admin.report@gmail.com  </p>
                </div>
            </div>
            {/* <div className="flex place-self-center ">
                <div className=" h-6 w-6 ">
                    <i className="far fa-copyright"></i>
                </div>
                <div>
                    Copyright 2021  |  SIT KMUTT
                </div>
            </div> */}
        </div>
    )
}