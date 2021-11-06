import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { postReview } from "../../../core/service/postReview";
import { getTopic } from "../../../core/service/getReview";

class CreateReviewContext {
  reviewTitle;
  reviewContent;
  reviewLink;
  reviewer;
  topicId;
  file;

  /* ERROR */
  reviewTitleError;
  reviewContentError;
  reviewLinkError;
  reviewerError;
  topicIdError;

  topic
  onClose;

  constructor() {
    this.reviewTitle = "";
    this.reviewContent = "";
    this.reviewLink = "";
    this.reviewer = "";
    this.topicId = "";
    this.file = null;
    /* ERROR */
    this.reviewTitleError = "";
    this.reviewContentError = "";
    this.reviewLinkError = "";
    this.reviewerError = "";
    this.descriptionError = "";
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  async prepareTopic() {
    try {
      const resp = await getTopic()
      if (resp.status !== 204) {
        this.topic = resp.data.data
      }
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  async onSubmit() {
    this.reviewTitleError =
      this.reviewTitle === "" ? "this field is required" : "";
    this.reviewContentError =
      this.reviewContent === "" ? "this field is required" : "";
    this.reviewLinkError =
      this.reviewLink === "" ? "this field is required" : "";
    this.reviewerError = this.reviewer === "" ? "this field is required" : "";
    this.topicIdError = this.topicId === "" ? "this field is required" : "";

    console.log(this.reviewTitleError);
    console.log(this.reviewContentError);
    console.log(this.reviewLinkError);
    console.log(this.reviewerError);
    console.log(this.topicIdError);

    if (
      this.reviewTitleError === "" &&
      this.reviewContentError === "" &&
      this.reviewLinkError === "" &&
      this.reviewerError === "" &&
      this.topicIdError === ""
    ) {
      try {
        const resp = postReview(
          this.reviewTitle,
          this.reviewContent,
          this.reviewLink,
          this.reviewer,
          this.topicId
        );
        if (resp.status === 200) {
          this.onClose();
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  }
}
export const createReviewContext = createContext(new CreateReviewContext());
