

import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/sheet",
    component: Sheet
  },
  {
    path: "/review",
    component: Review
  },
];
//
export default function Navbar() {
    return (
      // bg-gradient-to-b from-dark
        <div className="h-24 w-full flex justify-between z-50 backdrop-filter backdrop-blur-md ">
            <Router>
                <div className="flex place-self-center w-1/5 justify-center">
                    <div >
                        <Link to="/home">
                          <img src="images/cheatsheetlogo1.png" alt="Logo" className="ml-44 w-52" />
                        </Link>
                    </div>
                </div> 
                <div className="flex place-self-center w-2/5 justify-evenly  " >
                        <div >
                            <Link to="/home">Home</Link>
                        </div>
                        <div >
                            <Link to="/sheet">Sheet</Link>
                        </div>
                        <div >
                            <Link to="/review">Review</Link>
                        </div>
                </div> 
                <Switch>
                    {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </Router>
        </div>
        
    )
}
function Home() {
    return <h2>home</h2>;
}
function Sheet() {
    return <h2>sheet</h2>;
}
function Review() {
    return <h2>review</h2>;
}
function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
}