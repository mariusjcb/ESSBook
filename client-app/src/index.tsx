import React from "react";
import ReactDOM from "react-dom";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import {createBrowserHistory} from 'history';
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from "react-router-dom";

export const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
