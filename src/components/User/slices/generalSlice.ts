import { ErrorCodes } from '@pages/Error/Codes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxState as State } from '@interfaces/UserState';

const initialState: State = {
  isDownloadAllowed: false,
  isNavbarLocked: false,
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
    changeNavbarLock: (state: State, action: PayloadAction<boolean>) => {
      state.isNavbarLocked = action.payload;
    },
  },
});

export const {
  allowDownload, disallowDownload, handleError, resetError, changeNavbarLock,
} = generalSlice.actions;

export default generalSlice.reducer;
