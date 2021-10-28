import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getSpecificReview, getReviewImage, getRecommendedReviews } from "../../core/service/getSheet";

class PreviewReviewContext {
  isLoad;
  review;
  image;
  recommendedReviews;

  constructor() {
    this.review = [];
    this.image = null;
    this.isLoad = false;
    this.recommendedReviews = [];
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  async prepareReview(id) {
    try {
      const resp = await getSpecificReview(id);
      if (resp.status !== 204) {
        this.setValue('review', resp.data);
        this.setValue('isLoad', true);
        document.title = "ITCheatSheet – " + this.review.data.reviewTitle;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async prepareReviewImage(id) {
    try {
      this.setValue('image',null)
      const resp = await getReviewImage(id);
      if (resp.status !== 204) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.setValue('image', e.target.result)
        };
        reader.readAsDataURL(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async prepareRecommendedReviews() {
    try {
      const resp = await getRecommendedReviews();
      if(resp.status !== 204){
        this.setValue("recommendedReviews", resp.data.data)
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
}

export const previewReviewContext = createContext(new PreviewReviewContext());