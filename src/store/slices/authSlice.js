import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: false,
    timeToExpire:''
  },
  reducers: {
    setAuth:(state, action) => {
        state.auth = action.payload
    },
    setTimeToExpire: (state, action) =>{
        state.timeToExpire = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {setAuth, setTimeToExpire } = authSlice.actions;

export default authSlice.reducer;
