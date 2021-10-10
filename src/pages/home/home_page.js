import React from "react";
import Navbar from "../../core/components/navbar";
import Footer from "../../core/components/footer";
import Helloworld from "../../hello-world.jpg"
export default function HomePage(){
    return(
        <div>
            <Navbar/>
            <div className="px-44 py-3 lg:px-44 sm:px-14 md:px-24 relative ">
                <img src={Helloworld} alt="tutorial for use website"  className="z-10 "/>
                <div className="absolute bottom-48 left-32 text-white antialiased space-y-5" >
                    <div className="rounded-lg  px-3 py-2 text-6xl font-semibold text-left backdrop-filter backdrop-blur-xl">HEADER-TEXT</div>
                    <div className="rounded-lg  px-3 py-2 text-lg font-light text-left backdrop-filter backdrop-blur-xl " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Ultrices sollicitudin diam sit odio non.</div>
                </div>
            </div>
            
        
            <div className="flex justify-center space-x-4 px-44 lg:px-44 sm:px-14 md:px-24 mt-36">
                <div>
                <img src={Helloworld} alt="tutorial for use website"/>
                    <div>Tutorial 1</div>
                </div>
                <div>
                <img src={Helloworld} alt="tutorial for use website"/>
                    <div>Tutorial 2</div>
                </div>
                <div>
                <img src={Helloworld} alt="tutorial for use website"/>
                    <div>Tutorial 3</div>
                </div>
            </div>

            <div className="mt-40 px-44 mb-20">
                HOT SHEET 
            </div>

            <div className="mb-24 px-44">
                HOT REVIEW
            </div>












            <Footer/>
        </div>
      
    )
    
}