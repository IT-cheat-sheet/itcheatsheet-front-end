import React from "react";
import Navbar from "../../core/components/navbar";
import Footer from "../../core/components/footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Helloworld from "../../hello-world.jpg";

export default function HomePage(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 390,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
      };
    return(
        <div className="h-screen w-screen">
            <Navbar/>
            {/* <div className="mx-44 my-3 lg:mx-44 sm:mx-14 md:mx-24 relative bg-red-200 ">
                <div className="bg-gray-emptymail bg-opacity-20">
                    <img src={Helloworld} alt="tutorial for use website"  className="z-10  object-center bg-red-700  object-contain h-46.313 w-full"/>
                </div>
                <div className="absolute bottom-32 left-36 text-white antialiased space-y-5 z-50 " >
                    <div className="rounded-lg  px-3 py-2 text-6xl font-semibold text-left backdrop-filter backdrop-blur-xl">HEADER-TEXT</div>
                    <div className="rounded-lg  px-3 py-2 text-lg font-light text-left backdrop-filter backdrop-blur-xl " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Ultrices sollicitudin diam sit odio non.</div>
                </div>
                
            </div> */}
            <div className="mx-44 my-3 lg:mx-44 sm:mx-14 md:mx-24 relative bg-red-200 ">
                <div className="absolute bottom-32 left-36 text-white antialiased space-y-5 z-50 " >
                    <div className="rounded-lg  px-3 py-2 text-6xl font-semibold text-left backdrop-filter backdrop-blur-xl">HEADER-TEXT</div>
                    <div className="rounded-lg  px-3 py-2 text-lg font-light text-left backdrop-filter backdrop-blur-xl " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Ultrices sollicitudin diam sit odio non.</div>
                </div>
                <Slider {...settings}>
                    <div className="bg-gray-emptymail bg-opacity-20">
                        <img src={Helloworld} alt="tutorial for use website"  className="z-10  object-center bg-red-700  object-contain h-46.313 w-full"/>
                    </div>
                    <div className="bg-lightblue-hover bg-opacity-20">
                        <img src={Helloworld} alt="tutorial for use website"  className="z-10  object-center bg-red-700  object-contain h-46.313 w-full"/>
                    </div>  
                    <div className="bg-red-button bg-opacity-20">
                        <img src={Helloworld} alt="tutorial for use website"  className="z-10  object-center bg-red-700  object-contain h-46.313 w-full"/>
                    </div>
                    <div className="bg-yellow-hover bg-opacity-20">
                        <img src={Helloworld} alt="tutorial for use website"  className="z-10  object-center bg-red-700  object-contain h-46.313 w-full"/>
                    </div>
                    <div className="bg-purple-formHover bg-opacity-20">
                        <img src={Helloworld} alt="tutorial for use website"  className="z-10  object-center bg-red-700  object-contain h-46.313 w-full"/>
                    </div>
                    <div className="bg-green-button bg-opacity-20">
                        <img src={Helloworld} alt="tutorial for use website"  className="z-10  object-center bg-red-700  object-contain h-46.313 w-full"/>
                    </div>
                </Slider>
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