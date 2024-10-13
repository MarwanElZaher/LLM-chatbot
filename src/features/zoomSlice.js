import { createSlice } from '@reduxjs/toolkit';

const zoomSlice = createSlice({
  name: 'zoom',
  initialState: 2,
  reducers: {
    setZoomLevel: (state, action) => action.payload,
  },
});

export const { setZoomLevel } = zoomSlice.actions;
export default zoomSlice.reducer;
