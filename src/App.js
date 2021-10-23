import "./App.css";
import HomePage from "./pages/home/home_page";
import AllSheets from "./pages/all_sheets/all_sheets_page";
import AllReviews from "./pages/all_reviews/all_reviews_page";
import PreviewSheet from "./pages/preview-sheet/preview_sheet_page";
import PreviewReview from "./pages/preview-review/preview_review_page"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminHome from "./pages/admin_home/admin_home_page";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/sheets/:id">
            <PreviewSheet />
          </Route>
          <Route path="/reviews/:id">
            <PreviewReview />
          </Route>
          <Route path="/admin/reviews/:id"></Route>
          <Route path="/admin/sheets/:id"></Route>
          <Route path="/admin/login"></Route>

          <Route path="/sheets">
            <AllSheets />
          </Route>
          <Route path="/reviews">
            <AllReviews />
          </Route>
          <Route path="/admin">
            <AdminHome />
          </Route>

          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
