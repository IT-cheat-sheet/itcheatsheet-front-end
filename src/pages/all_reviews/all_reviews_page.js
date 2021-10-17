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
          topics.push(topic.topicName);
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
      <div className="mx-44">
        <Carousel page="review" />
        <div className="px-10 mt-14">
          <SearchBox page="review" options={topics} onFilter={onFilter} onSearch={onSearch} />
        </div>
        {
          reviews.length > 0 ?
          <div>
            <div className="grid grid-cols-2 mt-7">
              {
                reviews.map((review) => (
                  <Link to={`/reviews/${review.reviewId}`}>
                    <ReviewThumb review={review} />
                  </Link>
                ))
              }
            </div>
            <div className="pt-12 pb-24">
              <Pagination page="review" current={current} total={total} url="/reviews" />
            </div>
          </div> :
          <div className="text-center header-secondary text-blue-body my-28">
            <i className="fas fa-times-circle header-primary block mb-5"></i>
            No Review Found
          </div>
        }
        <div>
          <button className="button-circular fixed z-30 bottom-12 right-24">
            <i className="fas fa-plus header-tertiary" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}