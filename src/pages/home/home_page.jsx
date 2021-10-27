
import Navbar from "../../core/components/navbar";
import Footer from "../../core/components/footer";
import Helloworld from "../../hello-world.jpg";

import Carousel from "../../core/components/carousel";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
// import { useParams } from 'react-router';
import { Link } from "react-router-dom";

export default function HomePage() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  // const params = useParams();
  const [sheet, setSheet] = useState([]);
  const [file, setFile] = useState([]);
  const [alls, setAlls] = useState([]);
  const [reviewPost] = useState([]);
  const [reviewImage, setReviewImage] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isVideo, setVideo] = useState({ name: "", check: false });
  let video = ["/images/1.mp4", "/images/1.mp4", "/images/1.mp4"]

  function Clickclick(asd) {
    // console.log(Object.values(asd)[0])
    console.log(asd)
    console.log(isVideo)
    if (isVideo.check === false) {

      setVideo((prevState) => ({
        ...prevState,
        name: video[asd], check: true
      }))
    }
    if (isVideo.check === true) {
      setVideo((prevState) => ({
        ...prevState,
        name: video[asd], check: false
      }))
    }
    console.log(isVideo)
  }
  useEffect(() => {

    async function getHotSheet() {

      const res = await fetch(`http://localhost:3000/semester/getall`)
      const data = await res.json();
      data.semesters.forEach((semester) => {
        reviewPost.push({ key: semester.semester, value: semester.semesterNumber });
      })
      //   console.log(reviewPost.length)
      // setReviewPost(reviewPost);
      var count = Math.floor(Math.random() * reviewPost.length);
      console.log(count)
      const res1 = await fetch(`http://localhost:3000/summarypost/hotSheet/${count}`);
      const data1 = await res1.json();
      setSheet(data1.data[0]);
      console.log(data1.data[0]);
      await fetchFile(data1.data[0].summaryPostId);

    }
    async function getHotReview() {
      var items = ["1", "2", "3", "4", "5"]
      var item = items[Math.floor(Math.random() * items.length)];
      console.log(item)
      // ${item}

      const res = await fetch(`http://localhost:3000/review/hotReview/${item}`)
      const data = await res.json();
      setAlls(data.data[0]);
      console.log(data.data[0].reviewId)
      await fetchReviewImage(data.data[0].reviewId)

    }

    async function fetchReviewImage(num) {
      /* รอเปลี่ยนเป็นตัวแปร */

      console.log(num)
      const res = await fetch(`http://localhost:3000/review/image/${num}`);
      const data = await res.blob();

      if (res.status === 200) {
        // console.log(data.type)
        if (data.type.includes("image")) {
          var reader = new FileReader();
          reader.onload = (e) => {
            setReviewImage(e.target.result);
          };
          reader.readAsDataURL(data);
        }
      } else {
        setReviewImage(null);
      }
      setIsLoad(true);

    };
    async function fetchFile(num) {
      /* รอเปลี่ยนเป็นตัวแปร */

      const res = await fetch(`http://localhost:3000/summarypost/getFile/${num}`);
      const data = await res.blob();
      if (res.status === 200) {
        var reader = new FileReader();
        reader.onload = (e) => {
          setFile(e.target.result);
        };
        reader.readAsDataURL(data);
      } else {
        setFile(null);
      }

    }
    getHotReview();
    getHotSheet();
    // async function fetchReviewPost() {
    //     const res = await fetch(`http://localhost:3000/review/get/1`);
    //     const data = await res.json();
    //     setReviewPost(data);
    // };
    // window.addEventListener('resize', setVideo);
    //  window.addEventListener("click", setVideo);
    // fetchReviewPost();
    // fetchReviewImage();
    // async function fetchSheet() {
    //     /* รอใช้ hotreview ได้แล้วลบ*/
    //     const res = await fetch(`http://localhost:3000/summarypost/get/1`)
    //     const data = await res.json();

    //     setSheet(data);
    //     // setIsLoad(true);
    // };
    // fetchSheet();
    // fetchFile();
    document.title = "ITCheatSheet-Home"
  }, [isVideo, reviewPost])
  // , [params.id])

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="hidden md:block">

        <div className="mx-44 my-3 lg:mx-44 sm:mx-14 md:mx-24  bg-red-200 relative ">
          <Carousel page="home" />
          <div className="absolute bottom-36 -left-10 text-white antialiased space-y-5 z-10 " >
            <h1 className=" rounded-lg  px-3 py-2 text-6xl font-semibold text-left w-max backdrop-filter backdrop-blur-bx bg-red-padding bg-opacity-50 ">IT CHEATSHEET</h1>
            <div className="rounded-lg  px-3 py-2 text-lg font-light text-left backdrop-filter backdrop-blur-bx bg-red-padding bg-opacity-50 " >This website gathers a large number
              of summary sheets and reviews for
              all SIT students :)</div>
          </div>
        </div>
        <div className="flex justify-center text-gray-mailbox space-x-4 px-44 lg:px-44 sm:px-14 md:px-24 mt-36 ">
          <div>
            {/* <img src={Helloworld} alt="tutorial for use website" /> */}

            <video controls>
              <source src="/images/1.mp4" type="video/mp4" />
            </video>
            <div className="p-5 text-center">Basic use</div>
          </div>
          <div>
            <video controls>
              <source src="/images/1.mp4" type="video/mp4" />
            </video>
            <div className="p-5 text-center">Post sheet</div>
          </div>
          <div>
            <video controls>
              <source src="/images/1.mp4" type="video/mp4" />
            </video>
            <div className="p-5 text-center">Delete post</div>
          </div>
        </div>

        <div className="mt-40 mx-44  mb-20 z-40 h-46.313 relative flex">
          <div className=" bottom-36 left-0 text-white antialiased space-y-5 z-40 absolute mr-1.3/2 ">
            <h1 className="text-6xl font-semibold text-right text-violet-sheet">HOT SHEET</h1>
            <div className="text-lg font-normal text-right text-violet-sheet">The highest popularity of summary
              sheets at this time. Check it out now!
            </div>
          </div>
          <div className="bg-violet-hotsheet w-2/3  ml-1/3 flex justify-center shadow-lg rounded-md">

            <div className=" w-96 my-14 text-white text-5xl font-bold">
              {isLoad ?
                <Link to={`/sheets/${sheet.summaryPostId}`}>
                  <Document
                    file={file}
                  >
                    <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
                  </Document>
                </Link> : <></>}
              {isLoad ?
                <h1 className="flex justify-center mt-10 text-4xl text-center w-96">
                  <Link to={`/sheets/${sheet.summaryPostId}`}>
                    {sheet.posterName}
                  </Link></h1> :
                <h1 className="flex justify-center mt-10 text-3xl">File Name</h1>
              }
            </div>




          </div>
        </div>

        <div className="mb-24 mx-44 z-40  relative flex">
          <div className=" top-36 right-48 text-white text-left antialiased space-y-5 z-40 absolute pl-1.3/2 ">
            <h1 className="text-6xl font-semibold  text-blue-dark">HOT REVIEW</h1>
            <div className="text-lg font-normal text-blue-dark">The hotest reviews at this time.
              Check it out now!
            </div>
          </div>

          <div className="bg-violet-bg w-2/3  -ml-1/3  shadow-lg rounded-md">
            <div >
              {
                reviewImage ?
                  <img src={reviewImage} className=" object-cover h-96 w-full  rounded-t-lg" alt="review" />
                  : <img src="images/home_header_2.png" alt="Review" className="h-2.5/4  rounded-t-lg" />
              }

            </div>

            <div className="rounded-b-lg bg-blue-page px-9 pt-5 pb-5 lg:px-20 lg:pt-5 lg:pb-10 space-y-5 text-left relative">
              {isLoad ?
                <div className="h-48">
                  <div className="text-4xl font-semibold text-left text-white">{alls.reviewTitle}</div>
                  <div className="text-white font-light line-clamp-3">
                    {alls.reviewTitle}
                    <div className="font-normal underline ml-1 text-blue-dark absolute right-10 bottom-5">
                      {isLoad ?
                        <Link to={`/reviews/${alls.reviewId}`}>read more</Link> :
                        <></>}</div>
                  </div>
                </div>
                :
                <div>
                  <div className="text-4xl font-semibold text-left text-white"> Thread Name</div>
                  <div className="text-white font-light line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate quis bibendum blandit ultrices phasellus ultricies. lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate phasellus ultricies. Mattis pulvinar fusce vulputate phasellus ultricies phasellus ultricies  read more
                    <a href='https://www.youtube.com/watch?v=hZun_g5dEFo' className="font-normal underline ml-1 text-blue-dark absolute right-10 bottom-5">read more</a>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden overflow-hidden h-full">
        <div className=" relative  ">
          <Carousel page="home" />

          <div className="absolute top-48 mx-10 antialiased space-y-2.5 z-10 grid grid-cols-1 justify-items-center place-self-center " >
            <h1 className=" rounded-lg  px-3 py-2 text-white text-4xl sm:text-6xl font-semibold text-center w-max backdrop-filter backdrop-blur-bx bg-red-padding bg-opacity-50">SIT CHEATSHEET</h1>
            <div className="rounded-lg  px-3 py-2 text-violet-header text-base sm:text-lg font-normal text-center" >This website gathers a large number
              of summary sheets and reviews for
              all SIT students :)</div>
          </div>


        </div>
        {isVideo.check ?

          <div className="h-oversize absolute top-0 inset-0 z-50 grid grid-cols-1 backdrop-filter backdrop-blur-bx bg-violet-sheet bg-opacity-50 ">
            <div id="asd" onClick={Clickclick} className="top-8 right-8 absolute">
              <i className="fas fa-times text-4xl text-gray-mailbox "></i>
            </div>

            <div className="space-y-10 grid grid-cols-1 justify-items-center place-self-center mx-9" >
              <video controls>
                <source src={isVideo.name} type="video/mp4" />
              </video>
              {/* <img src= alt="tutorial for use website" /> */}
              <div>{isVideo.check} </div>
            </div>

          </div>

          :
          <div className="z-10 relative  -top-28 grid grid-rows-1  example  grid-flow-col text-gray-mailbox overflow-x-auto space-x-4 ml-4 pr-9">
            <div onClick={() => Clickclick(0)} className="w-120 ">
              <img src={Helloworld} alt="tutorial for use website" />
              <div className="p-5 text-center">Basic use</div>
            </div>
            <div className="w-120 " >
              <img onClick={() => Clickclick(1)} src={Helloworld} alt="tutorial for use website" />
              <div className="p-5 text-center">Post sheet</div>
            </div>
            <div className="w-120 "  >
              <img onClick={() => Clickclick(2)} src={Helloworld} alt="tutorial for use website" />
              <div className="p-5 text-center">Delete post</div>
            </div>
          </div>
        }
        <div className="mt-12 mx-4 mb-12 z-40 ">
          <div className="left-0 text-white antialiased mb-2.5 z-40 ">
            <h1 className="text-6xl font-semibold text-left text-violet-sheet">HOT SHEET</h1>
          </div>
          <div className="bg-violet-bg flex justify-between items-center shadow-lg rounded-2xl h-40 p-10">
            <div className=" ">
              <div className="text-left text-4xl font-medium text-violet-sheet">
                {isLoad ?
                  <h1 className="flex justify-center mt-3 text-2xl text-left w-5/6">{sheet.posterName}</h1> :
                  <h1 className="flex justify-center mt-3 text-3xl">TITLE OF PDF</h1>
                }
              </div>
              <div className="text-left text-2xl font-light text-violet-sheet">POST OWNER</div>
            </div>

            {isLoad ?
              <Link to={`/sheets/${sheet.summaryPostId}`}>
                <i className="fas fa-chevron-right text-2xl"></i>
              </Link> : <></>}
          </div>
        </div>

        <div className="mb-12 mx-4 z-40 ">
          <div className=" text-white text-left antialiased mb-2.5 z-40   ">
            <h1 className="text-6xl font-semibold  text-blue-dark">HOT REVIEW</h1>
          </div>

          <div className="bg-violet-bg    shadow-lg rounded-md">
            <div >
              {
                reviewImage ?
                  <img src={reviewImage} className=" object-cover h-96 w-full  rounded-t-lg" alt="review" />
                  : <img src="images/home_header_2.png" alt="Review" className="h-2.5/4  rounded-t-lg" />
              }

            </div>
            <div className="rounded-b-lg bg-blue-page h-1.5/4 px-7 pt-5  pb-10 space-y-2 text-left relative">
              {isLoad ?
                <div className="h-48">
                  <div className="text-4xl font-semibold text-left text-white">{alls.reviewTitle}</div>
                  <div className="text-white font-light line-clamp-3">
                    {alls.reviewTitle}
                    <div className="font-normal underline ml-1 text-blue-dark absolute right-10 bottom-5">
                      {isLoad ?
                        <Link to={`/reviews/${alls.reviewId}`}>read more</Link> :
                        <></>}</div>
                  </div>
                </div>
                :
                <div>
                  <div className="text-4xl font-semibold text-left text-white"> Thread Name</div>
                  <div className="text-white font-light line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate quis bibendum blandit ultrices phasellus ultricies. lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate phasellus ultricies. Mattis pulvinar fusce vulputate phasellus ultricies phasellus ultricies  read more
                    <a href='https://www.youtube.com/watch?v=hZun_g5dEFo' className="font-normal underline ml-1 text-blue-dark absolute right-4 bottom-3">read more</a>
                  </div>
                </div>}

              {/* href={'/reviews/${id}'} */}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>

  )

}
