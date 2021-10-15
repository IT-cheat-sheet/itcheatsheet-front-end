import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Carousel from "../../core/components/carousel";
import Pagination from "../../core/components/pagination";
import SearchBox from "../../core/components/searchBox";
import ReviewThumb from "./review_thumb";

export default function AllReviews() {
  const [topics, setTopics] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  const location = useLocation();

  const params = new URLSearchParams(location.search);
  var page = params.get('page') ?? 1;
  page = parseInt(page);

  const pageSize = 6;

  // const temp =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate quis bibendum blandit ultrices phasellus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate quis bibendum blandit ultrices phasellus ultricies usce vulputate quis bibendum usce dipiscing elit. Mattis pulvinar fusce vulputate quisedbibe";

  useEffect(() => {
    (async function() {
      const res = await fetch(`http://localhost:3000/topic/getAll`);
      const data = await res.data;
      
      data.data.forEach((topic) => {
        topics.push(topic.topicName);
      })

      setTopics(topics);
    })();
    (async function() {
      const res = await fetch(`http://localhost:3000/review/getAll?page=${page - 1}&pageSize=${pageSize}&sortDesc=true`);
      const data = await res.data;
      
      data.data.rows.forEach((review) => {
        reviews.push(review);
      })

      setCurrent(page);
      setTotal(data.totalPage);
      setReviews(reviews);
    })();
  }, [topics, reviews, page])

  return (
    <div className="mx-44">
        <Carousel page="review" amount={2} />
        <div className="px-10 mt-14">
          <SearchBox page="review" options={topics} />
        </div>
        <div className="grid grid-cols-2 mt-7">
          {
            reviews.map((review) => (
              <Link to={`/reviews/${review.reviewId}`}>
                <ReviewThumb review={review} />
              </Link>
            ))
          }
          {/* <ReviewThumb review={{ reviewTitle: "Thread 1", reviewContent: temp, reviewImage: null}} />
          <ReviewThumb review={{ reviewTitle: "Thread 2", reviewContent: temp, reviewImage: "aquat.jpg"}} />
          <ReviewThumb review={{ reviewTitle: "Thread 3", reviewContent: temp, reviewImage: "tmt.jpg"}} />
          <ReviewThumb review={{ reviewTitle: "Thread 4", reviewContent: temp, reviewImage: null}} />
          <ReviewThumb review={{ reviewTitle: "Thread 5", reviewContent: temp, reviewImage: null}} />
          <ReviewThumb review={{ reviewTitle: "Thread 6", reviewContent: temp, reviewImage: "1618591702703.jpg"}} /> */}
        </div>
        <div className="pt-12 pb-24">
          <Pagination page="review" current={current} total={total} url="/reviews" />
        </div>
        <div>
          <button className="button-circular fixed z-30 bottom-12 right-24">
            <i className="fas fa-plus header-tertiary" />
          </button>
        </div>
    </div>
  );
}
