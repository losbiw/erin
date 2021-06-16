import config from '@modules/config';
import { Config, Mode, Quality } from '@interfaces/Config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  config: Config,
  tempConfig: Config,
  isConfigComplete: boolean
}

const initConfig = config.get();

const initialState: State = {
  config: initConfig,
  tempConfig: initConfig,
  isConfigComplete: initConfig.isSetupComplete,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changePrivacyAcceptance: (state: State) => {
      state.tempConfig.privacy = !state.tempConfig.privacy;
    },
    changeStartupPreference: (state: State) => {
      state.tempConfig.shouldStartup = !state.tempConfig.shouldStartup;
    },
    setSearchMode: (state: State, action: PayloadAction<Mode>) => {
      state.tempConfig.mode = action.payload;
    },
    addKeyword: (state: State, action: PayloadAction<string>) => {
      state.tempConfig.keywords.push(action.payload);
    },
    deleteKeyword: (state: State, action: PayloadAction<string>) => {
      const { keywords } = state.tempConfig;
      const index = keywords.indexOf(action.payload);

      if (index > -1) {
        keywords.splice(index, 1);
      }
    },
    setTimeoutDelay: (state: State, action: PayloadAction<number>) => {
      state.tempConfig.timer = action.payload;
    },
    setDownloadQuality: (state: State, action: PayloadAction<Quality>) => {
      state.tempConfig.quality = action.payload;
    },
    mergeTempConfig: (state: State) => {
      state.config = state.tempConfig;
    },
  },
});

export const {
  mergeTempConfig, setSearchMode, addKeyword, deleteKeyword, changePrivacyAcceptance,
  changeStartupPreference, setTimeoutDelay, setDownloadQuality,
} = settingsSlice.actions;

export default settingsSlice.reducer;
