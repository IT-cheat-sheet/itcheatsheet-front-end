import React from "react";
import Navbar from "../../core/components/navbar";
import Footer from "../../core/components/footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Helloworld from "../../hello-world.jpg";
// import Hheader1 from "images/home_header_1.png";

export default function HomePage(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 420,
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
            <div className="mx-44 my-3 lg:mx-44 sm:mx-14 md:mx-24  bg-red-200 static ">
                <div className="absolute bottom-60 left-36 text-white antialiased space-y-5 z-40 " >
                    <h1 className=" rounded-lg  px-3 py-2 text-6xl font-semibold text-left backdrop-filter backdrop-blur-3xl w-max  bg-opacity-20 bg-white">HEADER-TEXT</h1>
                    <div className="rounded-lg  px-3 py-2 text-lg font-light text-left backdrop-filter backdrop-blur-3xl bg-opacity-20 bg-white " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Ultrices sollicitudin diam sit odio non.</div>
                </div>
                
                <Slider {...settings} >
                    <div className="bg-gray-emptymail bg-opacity-20">
                        <img src="images/home_header_1.png" alt="tutorial for use website"  className="  object-center bg-red-700  object-contain  w-full rounded-md"/>
                    </div>
                    <div className="bg-lightblue-hover bg-opacity-20">
                        <img src="images/home_header_2.png" alt="tutorial for use website"  className="  object-center bg-red-700  object-contain  w-full rounded-md"/>
                    </div>  
                </Slider>
            </div>  
        
            <div className="flex justify-center text-gray-mailbox space-x-4 px-44 lg:px-44 sm:px-14 md:px-24 mt-36 z-40">
                <div>
                <img src={Helloworld} alt="tutorial for use website"/>
                    <div className="p-5">Tutorial 1</div>
                </div>
                <div>
                <img src={Helloworld} alt="tutorial for use website"/>
                    <div className="p-5">Tutorial 2</div>
                </div>
                <div>
                <img src={Helloworld} alt="tutorial for use website"/>
                    <div className="p-5">Tutorial 3</div>
                </div>
            </div>
            
            <div className="mt-40 mx-44  mb-20 z-40 h-46.313 relative flex">
                <div className=" bottom-36 left-0 text-white antialiased space-y-5 z-40 absolute mr-1.3/2 ">
                    <h1 className="text-6xl font-semibold text-right text-violet-sheet">HOT SHEET</h1>
                    <div className="text-lg font-normal text-right text-violet-sheet">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Non nulla risus elementum egestas massa mi a ultricies.
                    </div>
                </div>
                <div className="bg-violet-bg w-2/3  ml-1/3 flex justify-center shadow-lg rounded-md">
                    <div className="bg-orange-hover my-14">
                        <div>Pic</div>
                        <h1>File Name</h1>
                    </div>
                </div>
            </div>
           
            <div className="mb-24 mx-44 z-40 h-46.313 relative flex">
                <div className=" top-36 right-0 text-white text-left antialiased space-y-5 z-40 absolute ml-1.3/2 ">
                    <h1 className="text-6xl font-semibold  text-blue-dark">HOT REVIEW</h1>
                    <div className="text-lg font-normal text-blue-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Non nulla risus elementum egestas massa mi a ultricies.
                    </div>
                </div>

                <div className="bg-violet-bg w-2/3  -ml-1/3  shadow-lg rounded-md">      
                    <div >
                        <img src="images/home_header_2.png" alt="Review"  className="h-2.5/4  rounded-t-lg" />
                    </div>
                    <div className="rounded-b-lg bg-blue-page h-1.5/4 px-20 py-5 space-y-6 text-left">
                        <div className="text-4xl font-semibold text-left text-white"> Thread Name</div>
                        <div className="text-white font-light">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate quis bibendum blandit ultrices phasellus ultricies. lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate phasellus ultricies. Mattis pulvinar fusce vulputate phasellus ultricies phasellus ultricies  read more
                        </div> 
                    </div>
                </div>
            </div>











            <Footer/>
        </div>
      
    )
    
}