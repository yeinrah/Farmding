import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Common/UI/NavBar/NavBar";
import SearchBar from "./Common/UI/SearchBar/SearchBar";
import FundingRanking from "./Pages/Funding/FundingRanking/FundingRanking";
import Main from "./Pages/Main";
function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
      
      </Routes>
    </div>
  );
}

export default App;
