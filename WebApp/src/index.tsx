import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import {msalConfig} from "./AuthConfig";

const msalconfig = new PublicClientApplication(msalConfig);  

ReactDOM.render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <Provider store={store}>
          <MsalProvider instance={msalconfig}>
            <App />
          </MsalProvider>
      </Provider>
    </FluentProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
