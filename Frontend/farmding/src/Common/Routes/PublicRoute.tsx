import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import Landing from "../../Pages/Landing/Landing";
import Login from "../../Pages/Landing/Login";
import { loginState } from "../../Recoil/atoms/auth";

const PublicRoute = (props: any) => {
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  // return isLogin? <Navigate to="/"/>: <Landing/>
  return isLogin ? <Navigate to="/" /> : <Login />;
};

export default PublicRoute;
