import { configureStore } from '@reduxjs/toolkit';
import zoomReducer from './features/zoomSlice';
import modelReducer from './features/modelSlice';
const store = configureStore({
  reducer: {
    zoom: zoomReducer,
    model: modelReducer
  },
});

export default store;
