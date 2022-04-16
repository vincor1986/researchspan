import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Auth
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LoggedOut from "./components/auth/LoggedOut";

// Layout & Alerts
import Footer from "./components/layout/Footer";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";

// Search panels
import JobSearch from "./components/search-panels/JobSearch";
import PubSearch from "./components/search-panels/PubSearch";
import DiscussionSearch from "./components/search-panels/DiscussionSearch";

// Publications
import PublicationResults from "./components/publications/PublicationResults";

// Jobs
import JobResults from "./components/jobs/JobResults";
import PostVacancy from "./components/jobs/PostVacancy";
import ViewVacancy from "./components/jobs/ViewVacancy";

// Discuss
import DiscussionResults from "./components/discuss/DiscussionResults";
import ViewPost from "./components/discuss/ViewPost";
import PostNewDiscussion from "./components/discuss/PostNewDiscussion";

// Collections
import MyJobs from "./components/collection/MyJobs";
import MyPublications from "./components/collection/MyPublications";
import MyDiscussions from "./components/collection/MyDiscussions";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Redux
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

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
              <Route exact path="/loggedout" element={<LoggedOut />} />
              <Route exact path="/register" element={<Register />} />
              <Route path="/publications/*" element={<PubSearch />}>
                <Route exact path="" element={<PublicationResults />} />
                <Route
                  exact
                  path="mypublications"
                  element={<PrivateRoute element={<MyPublications />} />}
                />
              </Route>
              <Route path="/jobs/*" element={<JobSearch />}>
                <Route exact path="" element={<JobResults />} />
                <Route exact path=":jobId" element={<ViewVacancy />} />
                <Route
                  exact
                  path="new"
                  element={<PrivateRoute element={<PostVacancy />} />}
                />
                <Route exact path=":jobId/*" element={<ViewVacancy />} />
                <Route
                  exact
                  path="myjobs"
                  element={<PrivateRoute element={<MyJobs />} />}
                />
              </Route>
              <Route path="/discuss/*" element={<DiscussionSearch />}>
                <Route exact path="" element={<DiscussionResults />} />
                <Route
                  exact
                  path="mydiscussions"
                  element={<PrivateRoute element={<MyDiscussions />} />}
                />
                <Route
                  exact
                  path="post/new"
                  element={<PrivateRoute element={<PostNewDiscussion />} />}
                />
                <Route exact path="post/:postId" element={<ViewPost />} />
                <Route exact path="post/:postId/*" element={<ViewPost />} />
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
