import { ErrorCodes } from '@pages/Error/Codes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxState as State } from '@interfaces/UserState';

const initialState: State = {
  isDownloadAllowed: false,
  error: null,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    allowDownload: (state: State) => {
      state.isDownloadAllowed = true;
    },
    disallowDownload: (state: State) => {
      state.isDownloadAllowed = false;
    },
    handleError: (state: State, action: PayloadAction<ErrorCodes | null>) => {
      state.error = action.payload;
    },
    resetError: (state: State) => {
      state.error = null;
    },
  },
});

export const {
  allowDownload, disallowDownload, handleError, resetError,
} = generalSlice.actions;

export default generalSlice.reducer;
