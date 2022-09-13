import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./AuthConfig";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const msalconfig = new PublicClientApplication(msalConfig);
initializeIcons(/* optional base url */);
//const { t } = useTranslation();

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr', 'es'],
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'sessionStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json"
    },
  });

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <React.StrictMode>
      <FluentProvider theme={teamsLightTheme}>
        <Provider store={store}>
          <MsalProvider instance={msalconfig}>
            <App />
          </MsalProvider>
        </Provider>
      </FluentProvider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);
