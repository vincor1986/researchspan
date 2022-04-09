import { Fragment } from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";

const App = () => (
  <Fragment>
    <Navbar />
    <Home />
    <Footer />
  </Fragment>
);

export default App;
