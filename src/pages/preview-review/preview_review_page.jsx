import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router';
import Kebab from '../../core/components/kebab'
import RecommendedBlock from './components/recommended_block'
import Navbar from '../../core/components/navbar';
import Footer from '../../core/components/footer';
import { previewReviewContext } from './preview_review_context';
import _ from 'lodash';
import { Observer } from "mobx-react-lite";

export default function PreviewReview() {
  const params = useParams();
  const context = useContext(previewReviewContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    context.prepareReview(params.id);
    context.prepareReviewImage(params.id);
    context.prepareRecommendedReviews();
  }, [params,context])

  return (
    <Observer>
      {() => (
        <div className="min-h-screen flex flex-col justify-between">
          <div>
          <Navbar />
          {
            context.isLoad ?
              <>
                <div className="pt-20 lg:pt-0 px-4 md:px-20 lg:px-44 bg-lightblue-bg md:bg-white">
                  <div className="md:hidden">
                    <h1 className="text-2xl font-bold pt-5 text-blue-body"> {context.review.data.reviewTitle}</h1>
                    <div className="float-right -mt-8">
                      <Kebab page="review" postId={context.review.data.reviewId} />
                    </div>
                    <div className="flex mt-1">
                      <p className="px-4 py-0.5 rounded-3xl bg-blue-form text-white text-xs">{context.review.data.reviewer}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:mt-5">
                    <h1 className="header-secondary text-blue-body"> {context.review.data.reviewTitle}</h1 >
                    <div className="flex my-2">
                      <p className="px-6 rounded-3xl bg-blue-form text-white">{context.review.data.reviewer}</p>
                    </div>
                  </div>
                  <div className="mt-5 text-sm md:text-2xl bg-lightblue-bg rounded-lg pb-5 md:pb-12">
                    <div className="hidden md:flex justify-end mr-6 pt-2">
                      <Kebab page="review" postId={context.review.data.reviewId} />
                    </div>
                    <p className="md:mx-14 text-blue-body leading-relaxed break-words">
                      {context.review.data.reviewContent}
                    </p>
                    {
                      context.image ?
                        <img src={context.image} className="mt-5 w-full md:w-4/6 md:mx-auto rounded-lg" alt="review" />
                        : <></>
                    }
                  </div>
                </div>
                <div className="bg-white px-4 md:px-20 lg:px-44">
                  <h4 className="uppercase text-base md:text-2xl font-bold text-blue-body mt-7 md:mt-12">recommended threads</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 mb-12 md:mb-24">
                    {
                      _.map(context.recommendedReviews, (review, index) => (
                        // <Link to={`/reviews/${review.reviewId}`} key={index}>
                        <RecommendedBlock
                          review={review} key={index} />
                        // </Link>
                      ))
                    }
                  </div>
                </div>
              </>
              : <></>
          }
          </div>
          <Footer />
        </div>
      )}
    </Observer >

  )
}