import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Picture, WallpaperState as State } from '@interfaces/UserState';

const initialState: State = {
  pictureIndex: 0,
  collection: [],
};

const wallpaperSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    incrementIndex: (state: State) => {
      const { pictureIndex, collection } = state;
      const nextIndex = pictureIndex + 1;

      if (nextIndex >= collection.length) state.pictureIndex = 0;
      else state.pictureIndex = nextIndex;
    },
    decrementIndex: (state: State) => {
      const { pictureIndex, collection } = state;
      const prevIndex = pictureIndex - 1;

      if (prevIndex < 0) state.pictureIndex = collection.length - 1;
      else state.pictureIndex = prevIndex;
    },
    setIndexByNumber: (state: State, action: PayloadAction<number>) => {
      state.pictureIndex = action.payload;
    },
    pushToCollection: (state: State, action: PayloadAction<Picture[]>) => {
      state.collection.push(...action.payload);
    },
  },
});

export const {
  incrementIndex, decrementIndex, setIndexByNumber, pushToCollection,
} = wallpaperSlice.actions;

export default wallpaperSlice.reducer;
