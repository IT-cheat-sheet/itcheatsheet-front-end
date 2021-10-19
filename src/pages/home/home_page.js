import React from "react";
// import Navbar from "../../core/components/navbar";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Helloworld from "../../hello-world.jpg";
import Carousel from "../../core/components/carousel";

// import Hheader1 from "images/home_header_1.png";

export default function HomePage() {
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 420,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay:true,
    //   };

    return (
        <div className="h-full w-full">
            {/* <Navbar/>  */}
            <div className="hidden md:block">

                <div className="mx-44 my-3 lg:mx-44 sm:mx-14 md:mx-24  bg-red-200 relative ">
                    <Carousel page="home" />
                    <div className="absolute bottom-60 left-36 text-white antialiased space-y-5 z-10 " >
                        <h1 className=" rounded-lg  px-3 py-2 text-6xl font-semibold text-left w-max backdrop-filter backdrop-blur-bx bg-red-padding bg-opacity-50">HEADER-TEXT</h1>
                        <div className="rounded-lg  px-3 py-2 text-lg font-light text-left backdrop-filter backdrop-blur-bx bg-red-padding bg-opacity-50" >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Ultrices sollicitudin diam sit odio non.</div>
                    </div>
                </div>
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

                {/* <div className="mx-44 my-3 lg:mx-44 sm:mx-14 md:mx-24  bg-red-200 static ">
                <div className="absolute bottom-60 left-36 text-white antialiased space-y-5 z-10 " >
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
            </div>   */}

                <div className="flex justify-center text-gray-mailbox space-x-4 px-44 lg:px-44 sm:px-14 md:px-24 mt-36 ">
                    <div>
                        <img src={Helloworld} alt="tutorial for use website" />
                        <div className="p-5">Tutorial 1</div>
                    </div>
                    <div>
                        <img src={Helloworld} alt="tutorial for use website" />
                        <div className="p-5">Tutorial 2</div>
                    </div>
                    <div>
                        <img src={Helloworld} alt="tutorial for use website" />
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

                <div className="mb-24 mx-44 z-40  relative flex">
                    <div className=" top-36 right-0 text-white text-left antialiased space-y-5 z-40 absolute ml-1.3/2 ">
                        <h1 className="text-6xl font-semibold  text-blue-dark">HOT REVIEW</h1>
                        <div className="text-lg font-normal text-blue-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Non nulla risus elementum egestas massa mi a ultricies.
                        </div>
                    </div>

                    <div className="bg-violet-bg w-2/3  -ml-1/3  shadow-lg rounded-md">
                        <div >
                            <img src="images/home_header_2.png" alt="Review" className="h-2.5/4  rounded-t-lg" />
                        </div>
                        <div className="rounded-b-lg bg-blue-page  px-20 pt-5 pb-10 space-y-5 text-left relative">
                            <div className="text-4xl font-semibold text-left text-white"> Thread Name</div>
                            <div className="text-white font-light line-clamp-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate quis bibendum blandit ultrices phasellus ultricies. lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate phasellus ultricies. Mattis pulvinar fusce vulputate phasellus ultricies phasellus ultricies  read more
                                <a href={'/reviews/${id}'} className="font-normal underline ml-1 text-blue-dark absolute right-10 bottom-5">read more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden overflow-hidden">
                <div className=" relative ">
                    <Carousel page="home" />
                    <div className="absolute top-48 mx-10 antialiased space-y-2.5 z-10 grid grid-cols-1 justify-items-center place-self-center " >
                        <h1 className=" rounded-lg  px-3 py-2 text-white text-4xl sm:text-6xl font-semibold text-center w-max backdrop-filter backdrop-blur-bx bg-red-padding bg-opacity-50">HEADER-TEXT</h1>
                        <div className="rounded-lg  px-3 py-2 text-violet-header text-base sm:text-lg font-normal text-center" >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Ultrices sollicitudin diam sit odio non.</div>
                    </div>
                    <div className="z-40 sticky -bottom-20  grid grid-rows-1  example  grid-flow-col text-gray-mailbox overflow-x-auto space-x-4 ml-4">
                        <div className="w-120 ">
                            <img src={Helloworld} alt="tutorial for use website" />
                            <div className="p-5">Tutorial 1</div>
                        </div>
                        <div className="w-120 " >
                            <img src={Helloworld} alt="tutorial for use website" />
                            <div className="p-5">Tutorial 2</div>
                        </div>
                        <div className="w-120 "  >
                            <img src={Helloworld} alt="tutorial for use website" />
                            <div className="p-5">Tutorial 3</div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 mx-4 mb-12 z-40 ">
                    <div className="left-0 text-white antialiased mb-2.5 z-40 ">
                        <h1 className="text-6xl font-semibold text-left text-violet-sheet">HOT SHEET</h1>
                    </div>
                    <div className="bg-violet-bg flex justify-between items-center shadow-lg rounded-2xl h-40 p-10">
                        <div className=" ">
                            <div className="text-left text-4xl font-medium text-violet-sheet">TITLE OF PDF</div>
                            <div className="text-left text-2xl font-light text-violet-sheet">POST OWNER</div>
                        </div>
                        <i className="fas fa-chevron-right text-2xl"></i>
                    </div>
                </div>

                <div className="mb-12 mx-4 z-40 ">
                    <div className=" text-white text-left antialiased mb-2.5 z-40   ">
                        <h1 className="text-6xl font-semibold  text-blue-dark">HOT REVIEW</h1>
                    </div>

                    <div className="bg-violet-bg    shadow-lg rounded-md">
                        <div >
                            <img src="images/home_header_2.png" alt="Review" className="h-2.5/4  rounded-t-lg" />
                        </div>
                        <div className="rounded-b-lg bg-blue-page h-1.5/4 px-7 pt-5  pb-10 space-y-2 text-left relative">
                            <div className="text-4xl font-semibold text-left text-white"> Thread Name</div>
                            <div className="text-white font-light line-clamp-3">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate quis bibendum blandit ultrices phasellus ultricies. lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate phasellus ultricies. Mattis pulvinar fusce vulputate phasellus ultricies phasellus ultricies  read more
                                <a href={'/reviews/${id}'} className="font-normal underline ml-1 text-blue-dark absolute right-4 bottom-3">read more</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )

}