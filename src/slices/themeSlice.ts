import { Theme } from '@interfaces/Config';
import config from '@modules/config';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  value: Theme,
}

const initialState: State = {
  value: config.get().theme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setOpposite: (state: State) => {
      const { Dark, Light } = Theme;
      state.value = state.value === Dark ? Light : Dark;
    },
  },
});

export const { setOpposite } = themeSlice.actions;

export default themeSlice.reducer;
