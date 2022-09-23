import React from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";
import Balance from "./Balance";
import PrivateRoute from "./Common/Routes/PrivateRoute";
import PublicRoute from "./Common/Routes/PublicRoute";
import NavBar from "./Common/UI/NavBar/NavBar";
import ProjectDetail from "./Pages/Funding/ProjectDetail/ProjectDetail";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Landing/Login";
import Main from "./Pages/Main";
import MyPage from "./Pages/MyPage/Mypage";
import NFT from "./Pages/NFT/NFT";
import { loginState } from "./Recoil/atoms/auth";
import Test from "./Test";

function App() {
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);

  return (
    <div className="app">
      {isLogin && <NavBar />}
      
      <Routes>
        {/* <Route path="/login" element={<Login />}></Route> */}
        {/* <Route
          path="/landing"
          element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          }
        /> */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="/project"
          element={
            <PrivateRoute>
              <ProjectDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/nft"
          element={
            <PrivateRoute>
              <NFT />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        {/* <Route path="/mypage" element={<MyPage />}></Route> */}
        {/* <Route path="/" element={<Main />}></Route> */}
        {/* <Route path="/project" element={<ProjectDetail/>}></Route> */}
        {/* <Route path="/nft" element={<NFT />}></Route> */}

        <Route path="/test-metamask" element={<Balance />}></Route>

        {/* 404 만들기! */}
        <Route path="*" element={<Test />}></Route>
      </Routes>
    </div>
  );
}

export default App;
