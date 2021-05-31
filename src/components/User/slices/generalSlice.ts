import config from '@modules/config';
import { createSlice } from '@reduxjs/toolkit';
import { ReduxState as State } from '@interfaces/UserState';

const initialState: State = {
  isDownloadAllowed: false,
  config: config.get(),
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
  },
});

export const { allowDownload, disallowDownload } = generalSlice.actions;

export default generalSlice.reducer;
