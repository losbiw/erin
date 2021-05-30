import warningSlice from '@slices/warningSlice';
import { configureStore } from '@reduxjs/toolkit';
import themeSlice from '@slices/themeSlice';
import userSlice from '@slices/userSlice';

const store = configureStore({
  reducer: {
    warning: warningSlice,
    theme: themeSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
