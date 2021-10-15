import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import Kebab from '../../core/components/kebab'
import RecommendedBlock from './recommended_block'
import { Link } from 'react-router-dom';

export default function PreviewReview() {
  const params = useParams();
  const [reviewPost, setReviewPost] = useState(null);
  const [reviewImage, setReviewImage] = useState([]);
  const [isLoad, setIsload] = useState(false);
  const [recommendedPost, setRecommendedPost] = useState([]);

  const fetchReviewPost = async () => {
    const res = await fetch(`http://localhost:3000/review/get/${params.id}`);
    const data = await res.json();
    setReviewPost(data);
  }

  const fetchReviewImage = async () => {
    const res = await fetch(`http://localhost:3000/review/image/${params.id}`);
    setReviewImage(res);
  }

  const fetchRecommendedPost = async () => {
    const res = await fetch(`http://localhost:3000/review/random`);
    const data = await res.json();
    setRecommendedPost(data.data);
    setIsload(true)
  }

  useEffect(() => {
    fetchReviewPost();
    fetchReviewImage();
    fetchRecommendedPost();
  }, [])

  const RecommendedBlocks = recommendedPost.map((review) =>
    <Link to={`/reviews/${review.reviewId}`}>
      <RecommendedBlock
        image={`http://localhost:3000/review/image/${review.reviewId}`}
        reviewTitle={review.reviewTitle}
        reviewContent={review.reviewContent}
        reviewer={review.reviewer}
        reviewId={review.reviewId} />
    </Link>
  )

  return (
    <div className="mx-44">
      {isLoad ?
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
