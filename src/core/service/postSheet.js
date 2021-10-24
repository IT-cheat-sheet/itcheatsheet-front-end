import axios from "axios";

export const postSheet = (
  semesterNumber,
  subjectNumber,
  summaryTitle,
  summaryContent,
  posterName,
  linkAttachment
) => {
  return axios.post("/summarypost/create", {
    semesterNumber,
    subjectNumber,
    summaryTitle,
    summaryContent,
    posterName,
    linkAttachment,
  });
};

export const postThread = ({
  reviewTitle,
  reviewContent,
  reviewLink,
  reviewer,
  topicId,
}) => {
  axios.post("/review/add", {
    reviewTitle,
    reviewContent,
    reviewLink,
    reviewer,
    topicId,
  });
};
