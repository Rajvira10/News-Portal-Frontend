import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type user = {
  id: string;
  username: string;
  email: string;
};

export const auth = createSlice({
  name: "auth",
  initialState: {
    user: null as user | null,
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
    },
    logIn: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { logOut, logIn } = auth.actions;

export default auth.reducer;
