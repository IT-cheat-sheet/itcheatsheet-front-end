import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import Kebab from '../../core/components/kebab'
import RecommendedBlock from './recommended_block'
import { Link } from 'react-router-dom';
import Navbar from '../../core/components/navbar';
import Footer from '../../core/components/footer';

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
    <div>
      <Navbar />
      {
        isLoad ?
          <>
            <div className="pt-20 lg:pt-0 px-4 md:px-20 lg:px-44 bg-lightblue-bg md:bg-white">
              <div className="md:hidden">
                <h1 className="text-2xl font-bold pt-5 text-blue-body"> {reviewPost.data.reviewTitle}</h1>
                <div className="float-right -mt-8">
                  <Kebab page="review" postId={reviewPost.data.reviewId}/>
                </div>
                <div className="flex mt-1">
                  <p className="px-6 rounded-3xl bg-blue-form text-white text-xxs">{reviewPost.data.reviewer}</p>
                  <p className="ml-4 text-blue-page text-xxs">{reviewPost.data.reviewId}</p>
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="header-secondary text-blue-body"> {reviewPost.data.reviewTitle}</h1 >
                <div className="flex my-2">
                  <p className="uppercase px-6 rounded-3xl bg-blue-form text-white">{reviewPost.data.reviewer}</p>
                  <p className="ml-2.5 text-blue-page">{reviewPost.data.reviewId}</p>
                </div>
              </div>
              <div className="mt-5 text-sm md:text-2xl bg-lightblue-bg rounded-lg pb-5 md:pb-12">
                <div className="hidden md:flex justify-end mr-6 pt-2">
                  <Kebab page="review" postId={reviewPost.data.reviewId}/>
                </div>
                <p className="md:mx-14 text-blue-body">
                  {reviewPost.data.reviewContent}
                </p>
                {
                  reviewImage ?
                    <img src={reviewImage} className="mt-5 w-full md:w-4/6 md:mx-auto rounded-lg" alt="review" />
                    : <></>
                }
              </div>
            </div>
            <div className="bg-white px-4 md:px-20 lg:px-44">
              <h4 className="uppercase text-base md:text-2xl font-bold text-blue-body mt-7 md:mt-12">recommended threads</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 mb-12 md:mb-24">
                <RecommendedBlocks />
              </div>
            </div>

          </>
          : <></>
      }
      <Footer />
    </div >

  )
}