import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getSemester, getSheet } from "../../core/service/getSheet";

class AllSheetContext {
  semesters;
  sheets;
  current;
  total;
  isLoad;
  createToggle;
  confirmToggle;

  searchWord;
  filter;

  pageSize;

  constructor() {
    this.semesters = [];
    this.sheets = [];
    this.current = 0;
    this.total = 0;
    this.isLoad = false;
    this.createToggle = false;
    this.confirmToggle = false;
    this.searchWord = '';
    this.filter = '';
    this.pageSize = 12;
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  async prepareSemester() {
    try {
      const res = await getSemester();

      if (res.status === 200) {
        this.setValue('semesters', res.data.semesters);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async prepareSheet() {
    try {
      const res = await getSheet(this.current, this.pageSize, this.searchWord, this.filter);
    
      if(res.status === 200){
        this.setValue('sheets', res.data.summaryPosts.rows);
        this.setValue('total', res.data.totalPage);
        this.setValue('isLoad', true);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const allSheetContext = createContext(new AllSheetContext());