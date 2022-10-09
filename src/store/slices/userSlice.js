import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: {},
    onlineUsers:[]
  },
  reducers: {
    getUserDetails:(state, action) => {
        state.userInfo = action.payload
    },
    setOnlineUser:(state, action)=>{
      state.onlineUsers = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {getUserDetails, setOnlineUser} = userSlice.actions;

export default userSlice.reducer;