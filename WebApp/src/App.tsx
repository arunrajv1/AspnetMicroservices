import React from "react";
import "./App.css";
import SuperHeroListComponent from "./components/SuperHeroListComponent";
import { useState } from "react";
import { ISuperHero } from "./interface/ISuperHero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperHeroNewComponent from "./components/SuperHeroNewComponent";
import NoPageFoundComponent from "./components/NoPageFoundComponent";
import SuperHeroListDetails from "./components/SuperHeroListDetails";
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
