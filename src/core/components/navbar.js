
import Button from "../../core/components/button";
import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom";

export default function Navbar() {
    // const [isMobile, setIsMobile] = useState(false);
    const [isBars, setBars] = useState(false);
    // const updateDimension = () => {

    //     setIsMobile(window.innerWidth <= 768);

    // }
    useEffect(() => {
        window.addEventListener('resize', setBars);
        // window.addEventListener('resize', updateDimension);
    }, [])
    return (
        // backdrop-filter backdrop-blur-bx bg-white bg-opacity-50 

        <div className='h-full w-full sticky top-0 z-50 '>

            {window.innerWidth <= 768 ?
                <div className=''>

                    {isBars === true ?

                        <div className="h-screen  grid grid-cols-1 glass">
                            <div onClick={() => setBars(false)} className="top-8 right-8 absolute">
                                <i className="fas fa-times text-4xl text-gray-mailbox "></i>
                            </div>

                            <div className="space-y-10 grid grid-cols-1 justify-items-center place-self-center" >
                                <Link to="/">
                                    <div className="w-32 ">
                                        <Button color="purple" size="sm" children="HOME" />
                                    </div>
                                </Link>
                                <div >
                                    <Link to="/sheets">
                                        <div className="w-32">
                                            <Button color="violet" size="sm" children="SHEET" />
                                        </div>
                                    </Link>
                                </div>
                                <div >
                                    <Link to="/reviews">
                                        <div className="w-32">
                                            <Button color="blue" size="sm" children="REVIEW" />
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        </div>
                        :
                        <div className="fixed top-0 h-20 w-full flex justify-between  glass">

                            <div className="flex place-self-center  justify-center ml-8">
                                <div>
                                    <Link to="/">
                                        <img src="/images/cheatsheetlogo1.png" alt="Logo" className=" h-10" />
                                    </Link>
                                </div>
                            </div>
                            <div onClick={() => setBars(true)} className="flex place-self-center  justify-evenly  mr-8 " >
                                <div className="space-y-2">
                                    <div className="bg-violet-sheet w-10 h-1 rounded-xl"></div>
                                    <div className="bg-violet-sheet w-8 h-1 rounded-xl"></div>
                                    <div className="bg-violet-sheet w-10 h-1 rounded-xl"></div>
                                </div>
                            </div>

                        </div>
                    }
                </div>
                :
                <div className=" h-24 w-full flex justify-between  glass">

                    <div className="flex place-self-center  justify-center ml-24 lg:ml-44" >
                        <div >
                            <Link to="/">
                                <img src="/images/cheatsheetlogo1.png" alt="Logo" className="h-14 w-52 min-w-max" />
                            </Link>

                        </div>
                    </div>
                    {/* w-1/5w-2/5 */}
                    <div className="flex place-self-center space-x-14 justify-evenly mr-24 lg:mr-44 " >
                        <Link to="/">
                            <div className="w-32 ">
                                <Button color="purple" size="sm" children="HOME" />
                            </div>
                        </Link>
                        <div >
                            <Link to="/sheets">
                                <div className="w-32">
                                    <Button color="violet" size="sm" children="SHEET" />
                                </div>
                            </Link>
                        </div>
                        <div >
                            <Link to="/reviews">
                                <div className="w-32">
                                    <Button color="blue" size="sm" children="REVIEW" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>}
        </div>

    )
}