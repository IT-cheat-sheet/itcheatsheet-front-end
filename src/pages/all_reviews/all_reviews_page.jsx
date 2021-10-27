import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import Carousel from "../../core/components/carousel";
import Navbar from "../../core/components/navbar";
import Footer from "../../core/components/footer";
import Pagination from "../../core/components/pagination";
import SearchBox from "../../core/components/searchBox";
import ReviewThumb from "./components/review_thumb";
import { allReviewContext } from "./all_reviews_context";
import _ from 'lodash';
import { Observer } from "mobx-react-lite";

export default function AllReviews() {
  const context = useContext(allReviewContext);
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  var page = params.get('page') ?? 1;
  page = parseInt(page);

  const onFilter = (x) => {
    context.setValue('filter', x);
    //Force Back to First Page
    history.replace('/reviews');
  }

  const onSearch = (x) => {
    context.setValue('searchWord', x);
    //Force Back to First Page
    history.replace('/reviews');
  }

  useEffect(() => {
    document.title = "ITCheatSheet-Review"
    context.setValue('current', page);
    context.prepareTopic();
    context.prepareReview();
  }, [location])

  return (
    <Observer>
      {() => (
      <div>
        <Navbar />
        <div className="md:mx-44">
          <Carousel page="review" />
          <div className="px-4">
            <div className="text-2xl tracking-wider leading-normal md:text-popup font-bold text-blue-body mt-14 mb-5">ALL THREAD</div>
            <div className="md:px-10 md:mt-3">
              <SearchBox page="review" options={
                _.map(context.topics, (topic) => ({
                  key: topic.topicName,
                  value: topic.topicName
                }))
              } onFilter={onFilter} onSearch={onSearch} />
            </div>
            {context.isLoad ? (
              context.reviews.length > 0 ?
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-7">
                  {
                    _.map(context.reviews, (review, index) => (
                      <ReviewThumb review={review} />
                    ))
                  }
                </div>
                <div className="pt-10 mb:pt-12 pb-14 mb:pb-24">
                  <Pagination page="review" current={context.current} total={context.total} url="/reviews" />
                </div>
              </div> :
              <div className="text-center header-secondary text-blue-body my-28">
                <span className="material-icons-round text-9xl block mb-5">sentiment_very_dissatisfied</span>
                No Review Found
              </div>
            ) : <></>}
          </div>
          <div>
            <button className="button-circular fixed z-30 bottom-7 right-4 md:bottom-12 md:right-24">
              <span className="material-icons-round font-bold text-6xl md:text-8xl">add</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
      )}
    </Observer>
  );
}
