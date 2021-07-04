import { Theme } from '@interfaces/Config';
import config from '@modules/config';
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: config.get().theme,
  reducers: {
    setOpposite: (state: Theme) => {
      const { Dark, Light } = Theme;

      const newTheme = state === Dark ? Light : Dark;
      config.set({ theme: newTheme });

      return newTheme;
    },
  },
});

export const { setOpposite } = themeSlice.actions;

export default themeSlice.reducer;
