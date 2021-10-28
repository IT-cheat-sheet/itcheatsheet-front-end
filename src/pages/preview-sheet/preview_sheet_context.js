import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getSpecificPdf, getSpecificSheet } from "../../core/service/getSheet";
class PreviewSheetContext {
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
        this.setValue('sheet', resp.data);
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

}

export const previewSheetContext = createContext(new PreviewSheetContext());