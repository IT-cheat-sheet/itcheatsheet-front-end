import React from 'react'

export default function Footer() {
    return (
        <div className="grid w-full bg-gray-100 h-52 justify-self-center bg-gray-footer text-gray-subheader">
            <div className="place-self-center " >
                    <p className="text-center text-4xl ">Contact</p>
                    <p className="mt-1.5">Email : emailAdmin@mail.kmutt.ac.th</p>
                    
            </div>
            <div className="flex place-self-center ">
                <div className=" h-6 w-6 ">
                <i className="far fa-copyright"></i>
                </div>
                <div>
                    Copyright 2021  |  SIT KMUTT  
                </div>
            </div>
        </div>
    )
}