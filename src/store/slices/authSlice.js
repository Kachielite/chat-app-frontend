import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: false,
  },
  reducers: {
    checkAuthentication: (state) => {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      let expiryDate = localStorage.getItem("expiryDate");
      if (!userId || !token) {
        state.auth = false;
      } else if (new Date(expiryDate) <= new Date()) {
        state.auth = false;
      } else {
        state.auth = true;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { checkAuthentication } = authSlice.actions;

export default authSlice.reducer;
