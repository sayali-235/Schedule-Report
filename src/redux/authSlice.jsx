import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { email: 'sayalidivekar235@gmail.com', password: 'Sayali@235' },
    { email: 'neha.d12@gmail.com', password: 'Neha@12' },
    { email: 'pratik.m05@gmail.com', password: 'Pratik@05' },
    { email: ' ram.s34@gmail.com', password: 'Ram.s@34' },
    { email: ' sham.r23@gmail.com', password: 'Sham.r@23' },
  ],
  isAuthenticated: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find((u) => u.email ===  email && u.password === password);
      if (user) {
        state.isAuthenticated = true;
        state.currentUser = user;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
