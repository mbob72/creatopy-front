import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout"
import styles from './app.module.scss';
import "./App.css"
import {useAppApolloClient} from "./hooks";
import {ApolloProvider} from "@apollo/client";

function App() {

  const client = useAppApolloClient()

  return (
      <ApolloProvider client={client}>
        <div className={styles.wrapper}>
          <Router>
            <Routes >
              <Route path='*' element={<Layout />} />
            </Routes>
          </Router>
        </div>
      </ApolloProvider>
  );
}

export default App;
