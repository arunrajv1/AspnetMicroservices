import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";

ReactDOM.render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </FluentProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
