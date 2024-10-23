import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import modalReducer from './modalSlice'
import summaryReducer from './summarySlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    summary:summaryReducer,
  },
});

export default store;
