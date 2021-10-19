
import Button from "../../core/components/button";
import React, { useState, useEffect } from 'react'

import {
     BrowserRouter as Router,
    // Switch,
    // Route,
    Link
} from "react-router-dom";

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
// const routes = [
//   {
//     path: "/home",
//     component: Home
//   },
//   {
//     path: "/sheet",
//     component: Sheet
//   },
//   {
//     path: "/review",
//     component: Review
//   },
// ];
//
export default function Navbar() {
    const [isMobile, setIsMobile] = useState(false);
    const [isBars, setBars] = useState(false);
    const updateDimension = () => {

        setIsMobile(window.innerWidth <= 768);

    }
    useEffect(() => {
        window.addEventListener('resize', setBars);
        window.addEventListener('resize', updateDimension);
    }, [])
    return (
        // bg-gradient-to-b from-dark
        <Router>
        <div className='h-full w-full sticky top-0 z-50 '>
            
            { window.innerWidth <= 768?
                <div className= ''>
                    
                    {isBars === true ?
                        
                        <div className="h-screen  grid grid-cols-1 backdrop-filter backdrop-blur-bx bg-white bg-opacity-50 ">
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
                        <div className="fixed top-0 h-20 w-full flex justify-between  backdrop-filter backdrop-blur-bx bg-white bg-opacity-50">
                            
                                <div className="flex place-self-center  justify-center ml-8">
                                    <div>
                                        <Link to="/">
                                            <img src="images/cheatsheetlogo1.png" alt="Logo" className=" h-10" />
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
                <div className=" h-24 w-full flex justify-between  backdrop-filter backdrop-blur-bx bg-white bg-opacity-50">
                    
                        <div className="flex place-self-center  justify-center ml-44">
                            <div >
                                <Link to="/">
                                    <img src="images/cheatsheetlogo1.png" alt="Logo" className="h-14 w-52 min-w-max" />
                                </Link>

                            </div>
                        </div>
                        {/* w-1/5w-2/5 */}
                        <div className="flex place-self-center space-x-14 justify-evenly mr-44  " >
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
        </Router>
    )
}
// function Home() {
//   return <h2>home</h2>;
// }
// function Sheet() {
//   return <h2>sheet</h2>;
// }
// function Review() {
//   return <h2>review</h2>;
// }
// function RouteWithSubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       render={props => (
//         // pass the sub-routes down to keep nesting
//         <route.component {...props} routes={route.routes} />
//       )}
//     />
//   );
// }