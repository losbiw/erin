import warningSlice from '@redux/slices/warningSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    warning: warningSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
