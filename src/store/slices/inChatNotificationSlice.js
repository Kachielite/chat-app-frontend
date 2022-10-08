import { createSlice } from "@reduxjs/toolkit";

export const inChatNotificationSlice = createSlice({
  name: "inChatNotify",
  initialState: {
    showInAppToast: false,
    toastMessage:''
  },
  reducers: {
    setShowInAppToast:(state, action) => {
        state.showInAppToast = action.payload
    },
    setToastMessage: (state, action) =>{
        state.toastMessage = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {setShowInAppToast, setToastMessage } = inChatNotificationSlice.actions;

export default inChatNotificationSlice.reducer;