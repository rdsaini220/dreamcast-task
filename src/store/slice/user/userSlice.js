import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: [],
  isError: null,
};

const apiSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequest(state) {
      state.isLoading = true;
      state.isError = null;
    },
    userSuccess(state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    userFailure(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
    },
    userAdd(state, action) {
      state.data.push(action.payload);
    },
    userEdit(state, action) {
      state.data = state.data.map((item) => item.id === action.payload.id ? action.payload : item)
    },
    userDelete(state, action) {
      state.data = state.data.filter(record => record.id !== action.payload);
    },
  },
});

export const {
  userRequest,
  userSuccess,
  userFailure,
  userAdd,
  userEdit,
  userDelete,
} = apiSlice.actions;

export default apiSlice.reducer;
