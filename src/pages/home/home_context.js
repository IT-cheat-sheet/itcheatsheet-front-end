import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getReviewImage, getSuggestedReview, getSuggestedSheet } from "../../core/service/getSheet";

class HomeContext {
  sheet;
  review;
  image;
  isSheetLoad;
  isReviewLoad;
  isImageLoad;
  showVid;
  vidList;

  constructor() {
    this.review = [];
    this.sheet = [];
    this.image = null;
    this.isSheetLoad = false;
    this.isReviewLoad = false;
    this.isImageLoad = false;
    this.showVid = '';
    this.vidList = [];
    makeAutoObservable(this);
  }

  setValue(key, value){
    this[key] = value;
  }

  async prepareSheet() {
    try {
      const res = await getSuggestedSheet(3);
      if(res.status === 200){
        this.setValue('sheet', res.data.data[0]);
        this.setValue('isSheetLoad', true);
      }
    } catch(err) {
      console.log(err);
      alert(err.message);
    }
  }

  async prepareReview() {
    this.setValue('image', null);

    try {
      var rand = Math.floor(Math.random() * 5) + 1;
      const res = await getSuggestedReview(rand);
      if(res.status === 200){
        this.setValue('review', res.data.data[0]);
        this.prepareReviewImage(this.review.reviewId);
        this.setValue('isReviewLoad', true);
      }
    } catch(err) {
      console.log(err);
      alert(err.message);
    }
  }

  async prepareReviewImage(id) {
    try {
      this.setValue('image',null);
      const res = await getReviewImage(id);
      if (res.status === 200) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.setValue('image', e.target.result);
          this.setValue('isImageLoad',null)
        };
        reader.readAsDataURL(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const homeContext = createContext(new HomeContext());