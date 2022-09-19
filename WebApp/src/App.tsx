import React, { lazy, Suspense } from "react";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/common/navbar/NavbarComponent";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import LoginComponent from "./components/LoginComponent";

const LandingPageComponent = lazy(
  () => import("./components/common/LandingPageComponent")
);
const NoPageFoundComponent = lazy(
  () => import("./components/NoPageFoundComponent")
);

const App: React.FC = () => {
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <div id="overlay-root" />
      <UnauthenticatedTemplate>
        <LoginComponent />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <NavbarComponent></NavbarComponent>
        <BrowserRouter>
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Routes>
            {/* <Route path="list-superheroes" element={<SuperHeroListDetails />} /> */}
            <Route path="/" element={<LandingPageComponent />} />
            {/* <Route path="new-superhero" element={<SuperHeroNewComponent />} /> */}
            <Route path="*" element={<NoPageFoundComponent />} />
          </Routes>
          {/* </Suspense> */}
        </BrowserRouter>
      </AuthenticatedTemplate>
    </div>
  );
};

export default App;
