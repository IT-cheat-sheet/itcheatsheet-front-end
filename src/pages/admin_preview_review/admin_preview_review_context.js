import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getSpecificReview, getSpecificReviewImage } from "../../core/service/getSheet";
import { deleteReview } from "../../core/service/deleteSheet"

class AdminPreviewReviewContext {
  isLoad;
  review;
  image;
  token;
  state;
  history;

  constructor() {
    this.review = [];
    this.image = null;
    this.isLoad = false;
    this.token = this.getCookie('cheatSheetToken');
    this.deleteSuccess = false;
    this.history = [];
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  getCookie = (name) => {
    const c = document.cookie.split(';').find(c => c.trim().startsWith(name + '='));
    return c ? c.substring((name + '=').length) : null;
  }

  async prepareReview(id) {
    try {
      const resp = await getSpecificReview(id);
      if (resp.status !== 204) {
        this.setValue('review', resp.data.data);
        this.setValue('isLoad', true)
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async prepareReviewImage(id) {
    try {
      const resp = await getSpecificReviewImage(id);
      if (resp.status === 200) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.setValue('image', e.target.result)
        };
        reader.readAsDataURL(resp.data);
      } else {
        this.setValue('image', null)
      }
    } catch (err) {
      console.log(err);
    }
  }

  async delReview(postId, token) {
    try {
      const resp = await deleteReview(postId, token);
      if (resp.status !== 204) {
        this.history.replace("/admin");
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
}

export const adminPreviewReviewContext = createContext(new AdminPreviewReviewContext());