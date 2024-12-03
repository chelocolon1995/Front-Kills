import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import Elites from "./pages/Elites";
import Killsday from "./pages/killsday"


import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
          <BrowserRouter>
          <Navbar />
            <Routes>
              <Route path="/Front-Kills" element={<Home  greeting="Bienvenidos - BURGer "/>} />
              <Route path="/elites" element={<Elites  greeting="Bienvenidos - BURGer "/>} />
              <Route path="/Front-Kills/upload" element={<Upload  greeting="Bienvenidos - BURGer "/>} />
              <Route path="/Front-Kills/:killsday" element={<Killsday greeting="Menu - " />} />
              <Route path="*" element={<h1>NO ENCONTRADO</h1>} />
            </Routes>
          </BrowserRouter>
    </>
  );
};

export default App;
