import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/layout/Footer";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";
import PubSearch from "./components/search-panels/PubSearch";
import PublicationResults from "./components/publications/PublicationResults";
import JobSearch from "./components/search-panels/JobSearch";
import JobResults from "./components/jobs/JobResults";
import DiscussionSearch from "./components/search-panels/DiscussionSearch";
import DiscussionResults from "./components/discuss/DiscussionResults";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
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
          </Route>
        </Routes>
      </main>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
