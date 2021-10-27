import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getSpecificPdf, getSpecificSheet } from "../../core/service/getSheet";
import { deleteSheet } from "../../core/service/deleteSheet"
class AdminPreviewSheetContext {
  isLoad;
  sheet;
  file;
  token;
  state;
  history;

  constructor() {
    this.sheet = [];
    this.file = null;
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

  async prepareSheet(id) {
    try {
      const resp = await getSpecificSheet(id);
      if (resp.status !== 204) {
        this.setValue('sheet', resp.data.summaryPost);
        this.setValue('isLoad', true)
        document.title = "ITCheatSheet – "+this.sheet.summaryTitle;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async preparePdf(id) {
    try {
      const resp = await getSpecificPdf(id);
      if (resp.status === 200) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.setValue('file', e.target.result)
        };
        reader.readAsDataURL(resp.data);
      } else {
        this.setValue('file', null)
      }
    } catch (err) {
      console.log(err);
    }
  }

  async delSheet(postId, token) {
    try {
      const resp = await deleteSheet(postId, token);
      if (resp.status !== 204) {
        this.history.replace("/admin");
      }
    } catch(err) {
      console.log(err);
      alert(err.message);
    }
  }
}

export const adminPreviewSheetContext = createContext(new AdminPreviewSheetContext());