import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Common/UI/Navbar/NavBar";
import SearchBar from "./Common/UI/SearchBar/SearchBar";
import FundingRanking from "./Pages/Funding/FundingRanking/FundingRanking";
import Main from "./Pages/Main";
import NFT from "./Pages/NFT/NFT";
function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/nft" element={<NFT />}></Route>
      </Routes>
    </div>
  );
}

export default App;
