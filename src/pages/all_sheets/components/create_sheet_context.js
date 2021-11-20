import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { postPdf, postSheet } from "../../../core/service/postSheet";
import { getSemester, getSubject } from "../../../core/service/getSheet";

class CreateSheetContext {
  title;
  subject;
  semester;
  licence;
  description;
  link;
  file;

  /* ERROR */
  titleError;
  subjectError;
  semesterError;
  licenceError;
  descriptionError;
  linkError;
  fileError;

  subjectChoice;
  onClose;
  onComplete;
  loading;

  constructor() {
    this.title = "";
    this.subject = "";
    this.semester = "";
    this.licence = "";
    this.description = "";
    this.link = "";
    this.file = null;
    /* ERROR */
    this.titleError = "";
    this.subjectError = "";
    this.semesterError = "";
    this.licenceError = "";
    this.descriptionError = "";
    this.linkError = "";
    this.fileError = "";

    this.loading = false;
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  async prepareSubject() {
    try {
      const resp = await getSubject();
      if (resp.status !== 204) {
        this.subjectChoice = resp.data.subjects;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  resetError() {
    this.titleError = "";
    this.subjectError = "";
    this.semesterError = "";
    this.licenceError = "";
    this.descriptionError = "";
    this.linkError = "";
    this.fileError = "";
  }

  async onSubmit() {
    this.titleError = this.title === "" ? "This field is required." : "";
    this.subjectError = this.subject === "" ? "This field is required." : "";
    this.semesterError = this.semester === "" ? "This field is required." : "";
    this.licenceError = this.licence === "" ? "This field is required." : "";
    this.descriptionError =
      this.description === "" ? "This field is required." : "";
    this.linkError = this.link === "" && this.file === null ? "Either this field or upload file is required." : "";
    this.fileError = this.link === "" && this.file === null ? "Either this field or link is required." :
    // Convert to MiB then to MB
    (this.file ? this.file.size * ((10 ** 6) / 2 ** 20) / 1024 / 1024 > 24 : false) ? "File size cannot exceed 24MB." : "";

    if (
      this.subjectError === "" &&
      this.semesterError === "" &&
      this.licenceError === "" &&
      this.descriptionError === "" &&
      (this.linkError !== "Either this field or upload file is required." || this.fileError !== "Either this field or upload file is required.") &&
      this.fileError !== "File size cannot exceed 24MB."
    ) {
      try {
        this.setValue("loading",true);
        const resp = await postSheet(
          this.semester,
          this.subject,
          this.title,
          this.description,
          this.licence,
          this.link
        );
        if (resp.status === 200) {
          const postResp = await postPdf(resp.data.result.summaryPostId, this.file);
          if(postResp.status === 200){
            this.onClose();
            this.setValue("loading", false);
            this.onComplete();
          }
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
        this.setValue("loading", false);
      }
    }
  }
}
export const createSheetContext = createContext(new CreateSheetContext());
