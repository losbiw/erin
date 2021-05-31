import { addWarning } from '@/Warning/warningSlice';
import store from '@app/store';
import { decrementIndex, incrementIndex } from '../slices/wallpaperSlice';

const switchWallpaper = (shouldIncrement: boolean) => {
  const { getState, dispatch } = store;
  const { general } = getState();

  if (!general.isDownloadAllowed) {
    dispatch(addWarning('Wait until the previous picture is downloaded'));
  } else if (shouldIncrement) {
    dispatch(incrementIndex());
  } else dispatch(decrementIndex());
};

export default switchWallpaper;
