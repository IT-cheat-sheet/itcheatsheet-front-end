import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getSpecificPdf, getSpecificSheet } from "../../core/service/getSheet";
class PreviewSheetContext {
  isLoad;
  sheet;
  file;
  ref;
  exceed;
  loading;

  constructor() {
    this.sheet = [];
    this.file = null;
    this.isLoad = false;
    this.loading = false;
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  async prepareSheet(id) {
    try {
      this.setValue("loading",true);
      const resp = await getSpecificSheet(id);
      if (resp.status !== 204) {
        this.setValue('sheet', resp.data);
        this.setValue("loading",false);
        this.setValue('isLoad', true);
        this.setValue('exceed', this.ref.current.scrollHeight > this.ref.current.clientHeight);
        document.title = "ITCheatSheet – "+this.sheet.summaryPost.summaryTitle;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
      this.setValue("loading",false);
    }
  }

  async preparePdf(id) {
    try {
      this.setValue("loading",true);
      this.setValue('file', null);
      const resp = await getSpecificPdf(id);
      if (resp.status === 200) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.setValue('file', e.target.result)
        };
        reader.readAsDataURL(resp.data);
        this.setValue("loading",false);
      }
    } catch (err) {
      console.log(err);
      this.setValue("loading",false);
    }
  }

}

export const previewSheetContext = createContext(new PreviewSheetContext());