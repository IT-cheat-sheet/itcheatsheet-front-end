import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import Kebab from '../../core/components/kebab'
import RecommendedBlock from './recommended_block'
import { Link } from 'react-router-dom';

export default function PreviewReview() {
  const params = useParams();
  const [reviewPost, setReviewPost] = useState([]);
  const [reviewImage, setReviewImage] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    async function fetchReviewPost() {
      const res = await fetch(`http://localhost:3000/review/get/${params.id}`);
      const data = await res.json();
      setReviewPost(data);
    };
    async function fetchReviewImage() {
      const res = await fetch(`http://localhost:3000/review/image/${params.id}`);
      const data = await res.blob();

      if (res.status === 200) {
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

    fetchReviewPost();
    fetchReviewImage();
  }, [params.id])

  const RecommendedBlocks = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      async function fetchRecommendedPost() {
        const res = await fetch(`http://localhost:3000/review/random`);
        const data = await res.json();
        setReviews(data.data.map((review,index) =>
        (
          <Link to={`/reviews/${review.reviewId}`} key={index}>
            <RecommendedBlock
              review={review} />
          </Link>
        )));
      }
      fetchRecommendedPost();
    }, [])

    return reviews;
  }

  return (
    <div className="mx-44">
      {
        isLoad ?
          <>
            <h1 className="uppercase header-secondary text-blue-body" > {reviewPost.data.reviewTitle}</h1 >
            <div className="flex my-2">
              <p className="uppercase px-6 rounded-3xl bg-blue-form text-white">{reviewPost.data.reviewer}</p>
              <p className="ml-2.5 text-blue-page">{reviewPost.data.reviewId}</p>
            </div>
            <div className="mt-5 body-base bg-lightblue-bg rounded-lg pb-12">
              <div className="flex justify-end mr-6 pt-2">
                <Kebab page="review" />
              </div>
              <p className="mx-14 text-blue-body">
                {reviewPost.data.reviewContent}
              </p>
              {
                reviewImage ?
                  <img src={reviewImage} className="mt-5 w-4/6 mx-auto" alt="review" />
                  : <></>
              }
            </div>
            <h4 className="uppercase body-base text-blue-body mt-12">recommended threads</h4>
            <div className="grid grid-cols-2 gap-4 mt-5 mb-24">
              <RecommendedBlocks />
            </div>
          </>
          : <></>
      }
    </div >

  )
}
