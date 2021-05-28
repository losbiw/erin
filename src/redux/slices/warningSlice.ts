import Warning from '@interfaces/Warning';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  value: string | Warning
}

const initialState: State = {
  value: 'hello',
};

const warningSlice = createSlice({
  name: 'warning',
  initialState,
  reducers: {
    addWarning: (state: State, action: PayloadAction<string | Warning>) => {
      state.value = action.payload;
    },
    closeWarning: (state: State) => {
      state.value = '';
    },
  },
});

export const { addWarning, closeWarning } = warningSlice.actions;
export default warningSlice.reducer;
