import "./App.css";
import HomePage from "./pages/home/home_page";
import AllSheets from "./pages/all_sheets/all_sheets_page";
import AllReviews from "./pages/all_reviews/all_reviews_page";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/sheets/:id"></Route>
          <Route path="/reviews/:id"></Route>
          <Route path="/admin/review/:id"></Route>
          <Route path="/admin/sheet/:id"></Route>

          <Route path="/sheets">
            <AllSheets />
          </Route>
          <Route path="/reviews">
            <AllReviews />
          </Route>
          <Route path="/admin"></Route>

          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
