import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { About } from "./pages/About";
import { LogLighter } from "./pages/LogLighter";
import { useContext } from "react";
import { LighterContext } from "./context/LighterContext";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="lighter" element={<LogLighter />} />
      </Routes>
    </div>
  );
}

export default App;
