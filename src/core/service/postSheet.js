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

export const postPdf = (id, file) => {
  const fd = new FormData();
  fd.append('file', file);

  return axios.post(`http://localhost:3000/summaryPost/upload/${id}`, fd,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}