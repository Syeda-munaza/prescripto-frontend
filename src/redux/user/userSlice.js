import { createSlice } from "@reduxjs/toolkit";
import { doctors } from "../../assets/assets_frontend/assets";

const initialState = {
  currentUser: {
    doctors: doctors,
    currencySymbol: "$",
  },
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    singInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    singInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutUser: (state) => {
      state.loading = false;
      state.currentUser = null;
    },
  },
});
export const { signInStart, singInSuccess, singInFailure, signOutUser } =
  userSlice.actions;
export default userSlice.reducer;
