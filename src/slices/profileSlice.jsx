import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userIndex: null,
  loading: false,
  users: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserIndex: (state, action) => {
      state.userIndex = action.payload;
    },
  },
});

export const { setUsers, setLoading, setUserIndex } = profileSlice.actions;
export default profileSlice.reducer;
