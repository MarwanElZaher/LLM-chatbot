// modelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const modelSlice = createSlice({
  name: 'model',
  initialState: {
    action: '',
    target: '',
    message: '',
    error: null,
  },
  reducers: {
    setResponse: (state, action) => {
      const { action: actionType, target, message } = action.payload;
      state.action = actionType;
      state.target = target;
      state.message = message;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearResponse: (state) => {
      state.action = '';
      state.target = '';
      state.message = '';
      state.error = null;
    },
  },
});

// Export actions and reducer
export const { setResponse, setError, clearResponse } = modelSlice.actions;
export default modelSlice.reducer;
