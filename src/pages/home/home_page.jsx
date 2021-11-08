import Navbar from "../../core/components/navbar";
import Footer from "../../core/components/footer";
import Carousel from "../../core/components/carousel";
import React, { useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import SheetThumb from "../all_sheets/components/sheet_thumb";
import { homeContext } from "./home_context";
import { Observer } from "mobx-react-lite";
import _ from "lodash";

export default function HomePage() {
  const context = useContext(homeContext);

  const history = useHistory();

  useEffect(() => {

    const importAll = (r) => {
      return r.keys().map(r);
    }

    const name = ["Basic use", "Post sheet", "Delete post"];
    const thumb = importAll(require.context(`../../../public/tutorial/thumbnail`, false, /\.(png|jpe?g|svg)$/));
    const vid = importAll(require.context(`../../../public/tutorial/video`, false, /\.(mp4)$/));
    const vidList = [];

    _.forEach(name, (name, index) => {
      vidList.push({
        name: name,
        thumb: thumb[index].default,
        src: vid[index].default
      })
    })

    context.setValue('vidList', vidList);
    context.prepareSheet();
    context.prepareReview();
    document.title = "ITCheatSheet"
  }, [])

  return (
  <Observer>
    {() => (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
      <Navbar />
        <div className="xl:mx-44 md:mx-24 my-3 sm:mx-14">
          <div className="relative">
            <Carousel page="home" />
            <div className="absolute top-36 xl:top-80 md:bottom-36 md:-left-10 text-white antialiased space-y-2 md:space-y-5 z-10">
              <h1 className="rounded-lg px-3 py-2 mx-auto md:m-0 text-4xl md:text-6xl font-semibold text-left w-max backdrop-filter backdrop-blur-bx bg-red-padding bg-opacity-50">IT CHEATSHEET</h1>
              <div className="text-base font-medium text-center text-violet-hover md:text-white md:rounded-lg px-4 md:px-3 md:py-2 md:text-lg md:font-light md:backdrop-filter md:backdrop-blur-bx md:bg-red-padding md:bg-opacity-50">
                This website gathers a large number of summary sheets and reviews for all IT students
              </div>
            </div>
          </div>

          {/* {context.showVid !== '' &&
            <Fragment>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-60 outline-none focus:outline-none mx-0 md:mx-4 backdrop-filter backdrop-blur-sm">
                <div className="relative space-y-2 grid grid-cols-1 justify-items-center place-self-center mx-9 w-4/5 md:w-2/3">
                  <div id="asd" onClick={() => context.setValue('showVid', '')} className="absolute right-0 -top-7 md:-top-9">
                    <span className="material-icons text-white text-2xl md:text-4xl cursor-pointer">cancel</span>
                  </div>
                  <div className="w-full">
                    <video controls autoPlay className="w-full rounded-xl">
                      <source src={context.showVid} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
              <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
            </Fragment>
          }
          <div className="overflow-x-auto hideScrollBar grid grid-rows-1 grid-flow-col relative -mt-28 md:flex md:justify-center text-gray-mailbox bg-scroll space-x-4 px-4 md:mt-28">
            {
              _.map(context.vidList, vid => (
                <div key={vid.name} onClick={() => context.setValue('showVid', vid.src)} className="w-72 md:w-full cursor-pointer">
                  <img src={vid.thumb} alt="tutorial for use website" className="rounded-xl" />
                  <div className="text-base md:text-xl p-5 text-center">{vid.name}</div>
                </div>
              ))
            }
          </div> */}

          <div className="mt-12 mb-20 md:mt-16 md:mb-20 mx-4 flex flex-col md:grid md:grid-cols-2 gap-y-16 md:gap-x-20 md:mx-0">
            <div className="md:col-span-1 md:order-2 w-full">
              <div className="text-white antialiased space-y-1">
                <h1 className="font-semibold text-violet-sheet w-full md:w-2/3 text-3xl md:text-iconLoad leading-none">SUGGESTED SHEET</h1>
                <div className="text-base md:text-lg font-normal text-violet-sheet uppercase">The sheet you may like</div>
              </div>
              <div className="hidden md:flex bg-violet-hotsheet mt-3 md:mt-8 w-full justify-center shadow-lg rounded-md h-128">
                <div className="w-2/3 text-white text-5xl font-bold grid grid-cols-1 place-content-center">
                  {context.isSheetLoad && <SheetThumb id={context.sheet.summaryPostId} fileName={context.sheet.summaryTitle} link={context.sheet.linkAttachment}/>}
                </div>
              </div>
              <Link to={`/sheets/${context.sheet.summaryPostId}`}>
                <div className="md:hidden grid grid-cols-12 bg-violet-hotsheet text-violet-sheet px-8 py-6 mt-3 w-full shadow-lg rounded-button h-auto">
                  <div className="col-span-10 w-8/10">
                    <div className="font-bold text-2xl truncate">{context.sheet.summaryTitle}</div>
                    <div>{context.sheet.posterName}</div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="material-icons-round text-4xl">chevron_right</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="md:col-span-1 md:order-1 w-full">
              <div className="text-white text-left antialiased space-y-1">
                <h1 className="font-semibold text-blue-dark w-full md:w-2/3 text-3xl md:text-iconLoad leading-none">SUGGESTED REVIEW</h1>
                <div className="text-base md:text-lg font-normal text-blue-dark uppercase">The review just for you</div>
              </div>
              {context.isReviewLoad && (
                <div className={`shadow-lg rounded-md mt-3 md:mt-8 overflow-hidden flex flex-col h-80 md:h-128`} onClick={
                  () => {
                    if(window.innerWidth < 768){
                      history.push(`/reviews/${context.review.reviewId}`);
                    }
                  }
                }>
                  {context.image &&
                  <div className="h-3/5">
                    <img src={context.image} className="object-cover h-full w-full" alt="review" />
                  </div>}
                  <div className={`bg-blue-page text-left relative space-y-2 ${context.image ? 'h-2/5 pt-3 md:pt-5 pb-5 lg:pb-10 px-5 md:px-4 lg:px-10' : 'h-full flex flex-col justify-center md:space-y-5 px-9 md:px-9 lg:px-20'}`}>
                    <div className={`text-2xl md:text-4xl font-semibold truncate text-left text-white`}>{context.review.reviewTitle}</div>
                    <div className={`text-white font-light ${context.image ? 'text-sm md:text-base line-clamp-3' : 'line-clamp-10'}`}>
                      {context.review.reviewContent}
                    </div>
                    <div className="hidden md:block font-normal underline ml-1 text-blue-dark text-right">
                      <Link to={`/reviews/${context.review.reviewId}`}>Read more</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    )}
  </Observer>
  )
}
