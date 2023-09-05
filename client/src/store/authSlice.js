import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : JSON.parse(sessionStorage.getItem("userInfo")),
    accounts: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userInfo = action.payload;
      if(action.payload.rememberMe) localStorage.setItem("userInfo", JSON.stringify(action.payload));
      else sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setLogout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      sessionStorage.removeItem("userInfo");
    },
    setAccounts:(state, action) => {
      state.accounts = action.payload.accounts
    },
  },
});

export const { setLogin, setLogout, setAccounts } = authSlice.actions;

export default authSlice.reducer;
