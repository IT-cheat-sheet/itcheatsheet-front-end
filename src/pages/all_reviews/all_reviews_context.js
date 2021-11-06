import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getReview, getTopic } from "../../core/service/getSheet";

class AllReviewContext {
  topics;
  reviews;
  current;
  total;
  isLoad;
  creating

  searchWord;
  filter;

  pageSize;

  constructor() {
    this.topics = [];
    this.reviews = [];
    this.current = 0;
    this.total = 0;
    this.isLoad = false;
    this.searchWord = '';
    this.filter = '';
    this.pageSize = 6;
    this.creating = false;
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  async prepareTopic() {
    try {
      const res = await getTopic();
  
      if(res.status === 200) {
        this.setValue('topics', res.data.data);
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  async prepareReview() {
    try {
      const res = await getReview(this.current, this.pageSize, this.searchWord, this.filter);
    
      if(res.status === 200){
        this.setValue('reviews', res.data.data.rows);
        this.setValue('total', res.data.totalPage);
        this.setValue('isLoad', true);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const allReviewContext = createContext(new AllReviewContext());