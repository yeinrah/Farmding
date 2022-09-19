import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Common/UI/NavBar/NavBar";
import ProjectDetail from "./Pages/Funding/ProjectDetail/ProjectDetail";
import Main from "./Pages/Main";
import NFT from "./Pages/NFT/NFT";
import Test from "./Test";


function App() {


  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/project" element={<ProjectDetail/>}></Route>
        <Route path="/nft" element={<NFT />}></Route>
        <Route path="/test-metamask" element={<Test />}></Route>
      </Routes>
    </div>
  );
}

export default App;
