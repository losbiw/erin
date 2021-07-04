import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const progressSlice = createSlice({
  name: 'progress',
  initialState: 0,
  reducers: {
    setProgress: (_state: number, action: PayloadAction<number>) => action.payload,
    resetProgress: () => 0,
  },
});

export const { setProgress, resetProgress } = progressSlice.actions;

export default progressSlice.reducer;
