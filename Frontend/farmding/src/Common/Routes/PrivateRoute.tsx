import React, { useEffect } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import Main from "../../Pages/Main";
import { loginState } from "../../Recoil/atoms/auth";

// export default function PrivateRoute({ element: Component, ...rest }) {
//   const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);

//   // useEffect(() => {
//   //   dispatch(getUser());
//   //   // return () => {
//   //   //   dispatch(logout());
//   //   // };
//   // }, []);

//   // if (currentUser == undefined) {
//   //   console.log(currentUser);
//   // }
//   //   return <Redirect to="/main" />;
//   // }

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isLogin ? <Component {...props} /> : <Route element={<Navigate replace to="/landing"/>}}

//     />

//   );
// }

// const PrivateRoute = ({ path , ...props }:any) => {
//   const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
//   console.log(path, 'ddddd')
//   return isLogin ? (
//     <Route {...props} path={path} />
//   ) : (
//     <Navigate to="/landing" state={{ from: path }} replace />
//     );
// };

// export default PrivateRoute;

const PrivateRoute = ({ children }: any) => {
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);

  const { pathname } = useLocation();

  return isLogin ? (
    children
  ) : (
    // <Navigate to="/landing" state={{ from: pathname }} replace />
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
};
export default PrivateRoute;
