import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: {}
  },
  reducers: {
    getUserDetails:(state, action) => {
        state.userInfo = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const {getUserDetails} = userSlice.actions;

export default userSlice.reducer;