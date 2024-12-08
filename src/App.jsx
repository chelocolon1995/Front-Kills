import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import Elites from "./pages/Elites";
import Killsday from "./pages/killsday"


import { HashRouter , Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
          <HashRouter>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/elites" element={<Elites/>} />
              <Route path="/upload" element={<Upload/>} />
              <Route path="/:killsday" element={<Killsday/>} />
              <Route path="*" element={<h1>NO ENCONTRADO</h1>} />
            </Routes>
          </HashRouter>
    </>
  );
};

export default App;
