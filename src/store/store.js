import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import notificationSlice from './slices/notificationSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    notification: notificationSlice
  },
})