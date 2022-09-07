import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./Pages/Main";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
