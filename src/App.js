import "./App.css";
import HomePage from "./pages/home/home_page";
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

          <Route path="/sheets"></Route>
          <Route path="/reviews"></Route>
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
