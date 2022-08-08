import React from "react";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPageFoundComponent from "./components/NoPageFoundComponent";
import LandingPageComponent from "./components/common/LandingPageComponent";
import NavbarComponent from "./components/common/navbar/NavbarComponent";
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <NavbarComponent></NavbarComponent>
      <BrowserRouter>
        <Routes>
          {/* <Route path="list-superheroes" element={<SuperHeroListDetails />} /> */}
          <Route path="/" element={<LandingPageComponent />} />
          {/* <Route path="new-superhero" element={<SuperHeroNewComponent />} /> */}
          <Route path="*" element={<NoPageFoundComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
