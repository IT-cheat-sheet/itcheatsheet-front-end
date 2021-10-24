import axios from "axios";

export const postReview = (
  reviewTitle,
  reviewContent,
  reviewLink,
  reviewer,
  topicId
) => {
  return axios.post("/review/add", {
    reviewTitle,
    reviewContent,
    reviewLink,
    reviewer,
    topicId,
  });
};
