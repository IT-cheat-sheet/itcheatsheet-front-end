import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getSpecificPdf, getSpecificSheet } from "../../core/service/getSheet";
import { deleteSheet } from "../../core/service/deleteSheet"

class AdminPreviewSheetContext {
  isLoad;
  sheet;
  file;

  constructor() {
    this.sheet = [];
    this.file = null;
    this.isLoad = false;
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  async prepareSheet(id) {
    try {
      const resp = await getSpecificSheet(id);
      if (resp.status !== 204) {
        this.setValue('sheet', resp.data.summaryPost);
        this.setValue('isLoad', true)
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async preparePdf(id) {
    try {
      const resp = await getSpecificPdf(id);
      if (resp.status !== 204) {
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
      alert(err.message);
    }
  }

  async delSheet(id, token) {
    try {
      await deleteSheet(id, token);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
}

export const adminPreviewSheetContext = createContext(new AdminPreviewSheetContext());