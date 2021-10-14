import React from "react";
import Pagination from "../../core/components/pagination";
import SearchBox from "../../core/components/searchBox";
import ReviewThumb from "./review_thumb";

export default function AllReviews() {
  const temp =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate quis bibendum blandit ultrices phasellus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis pulvinar fusce vulputate quis bibendum blandit ultrices phasellus ultricies usce vulputate quis bibendum usce dipiscing elit. Mattis pulvinar fusce vulputate quisedbibe";
  return (
    <div className="mx-44">
        <div className="px-10 mt-14">
          <SearchBox page="review" options={[
            {name: "Study", value: "Study"},
            {name: "Lifestyle", value: "Lifestyle"},
            {name: "Food", value: "Food"},
            {name: "Activities", value: "Activities"},
            {name: "Etc.", value: "Etc."}
          ]} />
        </div>
        <div className="grid grid-cols-2 mt-7">
          <ReviewThumb review={{ reviewTitle: "Thread 1", reviewContent: temp, reviewImage: null}} />
          <ReviewThumb review={{ reviewTitle: "Thread 2", reviewContent: temp, reviewImage: "aquat.jpg"}} />
          <ReviewThumb review={{ reviewTitle: "Thread 3", reviewContent: temp, reviewImage: "tmt.jpg"}} />
          <ReviewThumb review={{ reviewTitle: "Thread 4", reviewContent: temp, reviewImage: null}} />
          <ReviewThumb review={{ reviewTitle: "Thread 5", reviewContent: temp, reviewImage: null}} />
          <ReviewThumb review={{ reviewTitle: "Thread 6", reviewContent: temp, reviewImage: "1618591702703.jpg"}} />
        </div>
        <div className="pt-12 pb-24">
          <Pagination page="review" current={1} total={4} url="/asd" />
        </div>
        <div>
          <button className="button-circular fixed z-30 bottom-12 right-24">
            <i className="fas fa-plus header-tertiary" />
          </button>
        </div>
    </div>
  );
}
