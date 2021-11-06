import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getSpecificPdf, getSpecificSheet } from "../../core/service/getSheet";
class PreviewSheetContext {
  isLoad;
  sheet;
  file;
  ref;
  exceed;

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
        this.setValue('isLoad', true);
        this.setValue('exceed', this.ref.current.scrollHeight > this.ref.current.clientHeight);
        document.title = "ITCheatSheet – "+this.sheet.summaryPost.summaryTitle;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async preparePdf(id) {
    try {
      this.setValue('file', null);
      const resp = await getSpecificPdf(id);
      if (resp.status === 200) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.setValue('file', e.target.result)
        };
        reader.readAsDataURL(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

}

export const previewSheetContext = createContext(new PreviewSheetContext());