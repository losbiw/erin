import warningSlice from '@/Warning/warningSlice';
import { configureStore } from '@reduxjs/toolkit';
import themeSlice from '@/ThemeToggle/themeSlice';
import wallpaperSlice from '@/User/slices/wallpaperSlice';
import progressSlice from '@/ProgressBar/progressSlice';
import generalSlice from '@/User/slices/generalSlice';

const store = configureStore({
  reducer: {
    warning: warningSlice,
    theme: themeSlice,
    progress: progressSlice,
    wallpaper: wallpaperSlice,
    general: generalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
