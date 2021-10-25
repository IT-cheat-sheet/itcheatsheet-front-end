import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { postSheet } from "../../../core/service/postSheet";
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

  subjectChoice;
  semesterChoice;
  onClose;

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

  async prepareSemester() {
    try {
      const resp = await getSemester();
      if (resp.status !== 204) {
        this.semesterChoice = resp.data.semesters;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async onSubmit() {
    this.titleError = this.title === "" ? "this field is required" : "";
    this.subjectError = this.subject === "" ? "this field is required" : "";
    this.semesterError = this.semester === "" ? "this field is required" : "";
    this.licenceError = this.licence === "" ? "this field is required" : "";
    this.descriptionError =
      this.description === "" ? "this field is required" : "";
    this.linkError = this.link === "" ? "this field is required" : "";

    if (
      this.subjectError === "" &&
      this.semesterError === "" &&
      this.licenceError === "" &&
      this.descriptionError === "" &&
      this.linkError === ""
    ) {
      try {
        const resp = await postSheet(
          this.semester,
          this.subject,
          this.title,
          this.description,
          this.licence,
          this.link
        );
        if (resp.status === 200) {
          this.onClose();
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  }
}
export const createSheetContext = createContext(new CreateSheetContext());
