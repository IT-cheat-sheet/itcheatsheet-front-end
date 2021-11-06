import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { postPic, postReview } from "../../../core/service/postSheet";
import { getTopic } from "../../../core/service/getSheet";

class CreateReviewContext {
  reviewTitle;
  reviewContent;
  reviewer;
  topicId;
  file;

  /* ERROR */
  reviewTitleError;
  reviewContentError;
  reviewLinkError;
  reviewerError;
  topicIdError;

  onClose;
  onComplete;

  constructor() {
    this.reviewTitle = "";
    this.reviewContent = "";
    this.reviewer = "";
    this.topicId = "";
    this.file = null;
    /* ERROR */
    this.reviewTitleError = "";
    this.reviewContentError = "";
    this.reviewerError = "";
    this.topicIdError = "";
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  resetError() {
    this.reviewTitleError = "";
    this.reviewContentError = "";
    this.reviewerError = "";
    this.topicIdError = "";
  }

  async onSubmit() {
    this.reviewTitleError =
      this.reviewTitle === "" ? "this field is required" : "";
    this.reviewContentError =
      this.reviewContent === "" ? "this field is required" : "";
    this.reviewerError = this.reviewer === "" ? "this field is required" : "";
    this.topicIdError = this.topicId === "" ? "this field is required" : "";

    if (
      this.reviewTitleError === "" &&
      this.reviewContentError === "" &&
      this.reviewerError === "" &&
      this.topicIdError === ""
    ) {
      try {
        const resp = await postReview(
          this.reviewTitle,
          this.reviewContent,
          '',
          this.reviewer,
          this.topicId
        );
        if (resp.status === 200) {
          const postResp = await postPic(resp.data.result.reviewId, this.file);
          if(postResp.status === 200){
            this.onClose();
            this.onComplete();
            this.setValue('file', null);
          }
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  }
}
export const createReviewContext = createContext(new CreateReviewContext());
