import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import notificationSlice from './slices/notificationSlice';
import userSlice from './slices/userSlice';
import inChatNotificationSlice from './slices/inChatNotificationSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    notification: notificationSlice,
    user: userSlice, 
    inChat: inChatNotificationSlice
  },
})