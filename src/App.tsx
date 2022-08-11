import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout"
import styles from './app.module.scss';
import "./App.css"

function App() {

  return (
    <div className={styles.wrapper}>
      <Router>
        <Link to={'/login'}  />
        <Routes >
          <Route path='*' element={<Layout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
