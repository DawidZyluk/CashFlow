import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../store/authSlice";
import { useGetProfileQuery } from "../store/usersApiSlice";

const RootLayout = () => {
  const dispatch = useDispatch();
  const { data, refetch } = useGetProfileQuery();
  const userInfo = useSelector((state) => state.auth.userInfo)

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      refetch();
      dispatch(setLogin({ ...userInfo, ...data }));
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        dispatch(setLogout());
      }
    }
  }, [dispatch, data]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
