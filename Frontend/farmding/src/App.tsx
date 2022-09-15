import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Common/UI/Navbar/NavBar";
import ProjectDetail from "./Pages/Funding/ProjectDetail/ProjectDetail";
import Main from "./Pages/Main";
import MyPage from "./Pages/MyPage/Mypage";
import NFT from "./Pages/NFT/NFT";
function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/project" element={<ProjectDetail />}></Route>
        <Route path="/nft" element={<NFT />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
