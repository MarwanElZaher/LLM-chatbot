import { configureStore } from '@reduxjs/toolkit';
import zoomReducer from './features/zoomSlice';

const store = configureStore({
  reducer: {
    zoom: zoomReducer,
  },
});

export default store;
