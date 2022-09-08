import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SearchBar from "./Common/UI/SearchBar/SearchBar";
import FundingRanking from "./Pages/Funding/FundingRanking/FundingRanking";
import Main from "./Pages/Main";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/a" element={<SearchBar />}></Route>
        <Route path="/r" element={<FundingRanking />}></Route>
      </Routes>
    </div>
  );
}

export default App;
