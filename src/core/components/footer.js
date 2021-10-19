import React from 'react'

export default function Footer() {
    return (
        <div className="grid w-full bg-gray-100 h-52 justify-self-center bg-gray-footer">
            <div className="place-self-center" >
                    <p>-[ IT Cheatsheet ]-</p>
                    
            </div>
            <div className="flex place-self-center space-x-1">
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