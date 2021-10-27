import "./App.css";
import HomePage from "./pages/home/home_page";
import AllSheets from "./pages/all_sheets/all_sheets_page";
import AllReviews from "./pages/all_reviews/all_reviews_page";
import PreviewSheet from "./pages/preview-sheet/preview_sheet_page";
import PreviewReview from "./pages/preview-review/preview_review_page"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminHome from "./pages/admin_home/admin_home_page";
import AdminLogin from "./pages/admin_login/admin_login_page";
import AdminPreviewSheet from "./pages/admin_preview_sheet/admin_preview_sheet_page.jsx"
import AdminPreviewReview from "./pages/admin_preview_review/admin_preview_review_page";
import NotFound from "./pages/not_found/not_found_page";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/sheets/:id" component={PreviewSheet} />
          <Route path="/reviews/:id" component={PreviewReview} />
          <Route path="/admin/reviews/:id" component={AdminPreviewReview} />
          <Route path="/admin/sheets/:id" component={AdminPreviewSheet} />
          <Route path="/admin/login" component={AdminLogin} />

          <Route path="/sheets" component={AllSheets} />
          <Route path="/reviews" component={AllReviews} />
          <Route path="/admin" component={AdminHome} />

          <Route exact path="/" component={HomePage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
