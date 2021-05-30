import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  progress: number
}

const initialState: State = {
  progress: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProgress: (state: State, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    resetProgress: (state: State) => {
      state.progress = 0;
    },
  },
});

export const { setProgress, resetProgress } = userSlice.actions;

export default userSlice.reducer;
