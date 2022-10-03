import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: false,
  },
  reducers: {
    setAuth:(state, action) => {
        state.auth = action.payload
    },

  },
});

// Action creators are generated for each case reducer function
export const {setAuth } = authSlice.actions;

export default authSlice.reducer;
