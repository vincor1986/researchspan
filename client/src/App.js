import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { loadUser } from "./actions/auth";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/layout/Footer";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import PubSearch from "./components/search-panels/PubSearch";
import PublicationResults from "./components/publications/PublicationResults";
import JobSearch from "./components/search-panels/JobSearch";
import JobResults from "./components/jobs/JobResults";
import DiscussionSearch from "./components/search-panels/DiscussionSearch";
import DiscussionResults from "./components/discuss/DiscussionResults";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

//Redux
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <main>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route path="/publications/*" element={<PubSearch />}>
                <Route exact path="" element={<PublicationResults />} />
              </Route>
              <Route path="/jobs/*" element={<JobSearch />}>
                <Route exact path="" element={<JobResults />} />
              </Route>
              <Route path="/discuss/*" element={<DiscussionSearch />}>
                <Route exact path="" element={<DiscussionResults />} />
                <Route
                  exact
                  path="unique"
                  element={<PrivateRoute element={<JobResults />} />}
                />
              </Route>
            </Routes>
          </main>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
