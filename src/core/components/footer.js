import React from 'react'

export default function Footer() {
    return (
        <div className="static bottom-0 grid w-full bg-gray-100 py-6 text-xs tracking-tight sm:text-sm sm:tracking-wide justify-self-center bg-gray-footer text-gray-subheader">
            <div className="flex place-self-center">
                <div className="flex items-center">
                    <div className="flex">
                        <span className="material-icons text-xl">
                            copyright
                        </span>
                    </div>
                    <p className="pl-1">Copyright 2021  |  IT25 KMUTT</p>
                </div>
            </div>
        </div>
    )
}