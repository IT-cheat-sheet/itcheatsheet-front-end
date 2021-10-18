import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Carousel from "../../core/components/carousel";
import Navbar from "../../core/components/navbar";
import Footer from "../../core/components/footer";
import Pagination from "../../core/components/pagination";
import SearchBox from "../../core/components/searchBox";
import ReviewThumb from "./review_thumb";

export default function AllReviews() {
  const [topics] = useState([]);
  const [reviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  var [searchWord, setSearchWord] = useState('');
  var [filter, setFilter] = useState('');

  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  var page = params.get('page') ?? 1;
  page = parseInt(page);

  const pageSize = 6;

  const onFilter = (x) => {
    setFilter(x);
    //Force Refresher to ensure that the page will fetch the current filter
    setCurrent(0);
    //Force Back to First Page
    history.replace('/reviews');
  }

  const onSearch = (x) => {
    setSearchWord(x);
    //Force Refresher to ensure that the page will fetch the current search word
    setCurrent(0);
    //Force Back to First Page
    history.replace('/reviews');
  }

  useEffect(() => {
    if(topics.length === 0){
      (async function() {
        const res = await fetch(`http://localhost:3000/topic/getAll`);
        const data = await res.json();
      
        data.data.forEach((topic) => {
          topics.push({key: topic.topicName, value: topic.topicName});
        })
      })();
    }
    
    (async function() {
      const res = await fetch(`http://localhost:3000/review/getAll?page=${page - 1}&pageSize=${pageSize}&searchWord=${searchWord}&sortTopic=${filter}&sortDesc=true`);
      const data = await res.json();
      
      //Clear Existing Reviews
      reviews.length = 0;
      
      data.data.rows.forEach((review) => {
        reviews.push(review);
      })

      setCurrent(page);
      setTotal(data.totalPage);
    })();

  }, [topics, filter, page, reviews, searchWord])

  return (
    <div>
      <Navbar />
      <div className="md:mx-44">
        <Carousel page="review" />
        <div className="px-4">
          <div className="md:hidden body-base font-bold text-blue-body mt-14 mb-5">ALL THREAD</div>
          <div className="md:px-10 md:mt-14">
            <SearchBox page="review" options={topics} onFilter={onFilter} onSearch={onSearch} />
          </div>
          {
            reviews.length > 0 ?
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-7">
                {
                  reviews.map((review, index) => (
                    <Link key={index} to={`/reviews/${review.reviewId}`}>
                      <ReviewThumb review={review} />
                    </Link>
                  ))
                }
              </div>
              <div className="pt-10 mb:pt-12 pb-14 mb:pb-24">
                <Pagination page="review" current={current} total={total} url="/reviews" />
              </div>
            </div> :
            <div className="text-center header-secondary text-blue-body my-28">
              <span className="material-icons-round text-9xl block mb-5">sentiment_very_dissatisfied</span>
              No Review Found
            </div>
          }
        </div>
        <div>
          <button className="button-circular fixed z-30 bottom-7 right-4 md:bottom-12 md:right-24">
            <span className="material-icons-round font-bold text-6xl md:text-8xl">add</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
