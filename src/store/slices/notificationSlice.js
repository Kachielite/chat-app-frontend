import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "auth",
  initialState: {
    showInfo: false,
    message:''
  },
  reducers: {
    setShowInfo:(state, action) => {
        state.showInfo = action.payload
    },
    setMessage: (state, action) =>{
        state.message = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {setShowInfo, setMessage } = notificationSlice.actions;

export default notificationSlice.reducer;