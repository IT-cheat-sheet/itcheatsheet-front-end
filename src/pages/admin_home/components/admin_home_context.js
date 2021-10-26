import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getReport } from "../../../core/service/getSheet";
import { setReadStatus } from "../../../core/service/editSheet";

class AdminHomeContext {
  reports;
  readPage;
  isLoad;

  searchWord;
  filter;

  token;

  amount;

  constructor() {
    this.reports = [];
    this.readPage = false;
    this.isLoad = false;
    this.searchWord = '';
    this.filter = '';
    this.token = this.getCookie('cheatSheetToken');
    this.amount = -1;
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  getCookie = (name) => {
    const c = document.cookie.split(';').find(c => c.trim().startsWith(name + '='));
    return c ? c.substring((name + '=').length) : null;
  }

  async prepareReport() {
    try {
      const res = await getReport(this.filter, this.searchWord, this.readPage, this.token);
    
      if(res.status === 200){
        this.setValue('isLoad', true)
        this.setValue('reports', res.data.reports.reverse());

        if(this.amount < 0){
          this.setValue('amount', res.data.reports.length);
        }
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
}

export const adminHomeContext = createContext(new AdminHomeContext());