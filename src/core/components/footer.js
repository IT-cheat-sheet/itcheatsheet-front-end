import React from 'react'

export default function footer() {
    return (
        <div className="grid w-full bg-gray-100 h-52 justify-self-center">
            <div className="place-self-center" >
                    <p>-[ IT Cheatsheet ]-</p>
                    
            </div>
            <div className="flex place-self-center space-x-2">
                <div className="rounded-full h-6 w-6 flex items-center justify-center border-black border-2">
                    C
                </div>
                <div>
                    Copyright 2021  |  SIT KMUTT  
                </div>
            </div>
        </div>
    )
}